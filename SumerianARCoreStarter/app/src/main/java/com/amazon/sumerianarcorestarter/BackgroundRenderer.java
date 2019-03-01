/*
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code has been modified. Portions copyright 2018 Amazon.com, Inc. or its affiliates. Please see LICENSE.txt for applicable license terms and NOTICE.txt for applicable notices.
 */

package com.amazon.sumerianarcorestarter;

import android.content.Context;
import android.opengl.GLES11Ext;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.util.Log;

import com.google.ar.core.Frame;
import com.google.ar.core.Session;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * This class renders the AR background from camera feed. It creates and hosts the texture
 * given to ARCore to be filled with the camera image.
 */
public class BackgroundRenderer {
    private static final String TAG = BackgroundRenderer.class.getSimpleName();

    private static final int COORDS_PER_VERTEX = 3;
    private static final int TEXCOORDS_PER_VERTEX = 2;
    private static final int FLOAT_SIZE = 4;

    private FloatBuffer mQuadVerticesA;
    private FloatBuffer mQuadVerticesB;
    private FloatBuffer mQuadVerticesFull;
    private FloatBuffer mQuadTexCoord;
    private FloatBuffer mQuadTexCoordTransformed;

    private int mQuadProgram;


    private int mQuadPositionParam;
    private int mQuadTexCoordParam;
    private int [] textures;
    private int mCameraTextureIndex = 0;
    private int mSurfaceTextureIndex = 1;


    public int getCameraTextureName() {
        return textures[mCameraTextureIndex];
    }

    public int getSurfaceTextureName() {
        return textures[mSurfaceTextureIndex];
    }



    public BackgroundRenderer() {
    }

    public void swapTextures()
    {
        if (mCameraTextureIndex == 1) {
            mCameraTextureIndex = 0;
            mSurfaceTextureIndex = 1;
        } else {
            mCameraTextureIndex = 1;
            mSurfaceTextureIndex = 0;
        }


    }



    /**
     * Allocates and initializes OpenGL resources needed by the background renderer.  Must be
     * called on the OpenGL thread, typically in
     * {@link GLSurfaceView.Renderer#onSurfaceCreated(GL10, EGLConfig)}.
     *
     * @param context Needed to access shader source.
     */
    public void createOnGlThread(Context context) {
        // Generate the background texture.
        textures = new int[2];
        GLES20.glGenTextures(2, textures, 0);

        /*
        for (int tid : textures) {
            int textureTarget = GLES11Ext.GL_TEXTURE_EXTERNAL_OES;
            GLES20.glBindTexture(textureTarget, tid);
            GLES20.glTexParameteri(textureTarget, GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_CLAMP_TO_EDGE);
            GLES20.glTexParameteri(textureTarget, GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_CLAMP_TO_EDGE);
            GLES20.glTexParameteri(textureTarget, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_NEAREST);
            GLES20.glTexParameteri(textureTarget, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_NEAREST);
        }*/

        int numVertices = 4;
        if (numVertices != QUAD_COORDS_A.length / COORDS_PER_VERTEX) {
            throw new RuntimeException("Unexpected number of vertices in BackgroundRenderer.");
        }

        ByteBuffer bbVertices = ByteBuffer.allocateDirect(QUAD_COORDS_A.length * FLOAT_SIZE);
        bbVertices.order(ByteOrder.nativeOrder());
        mQuadVerticesA = bbVertices.asFloatBuffer();
        mQuadVerticesA.put(QUAD_COORDS_A);
        mQuadVerticesA.position(0);

        bbVertices = ByteBuffer.allocateDirect(QUAD_COORDS_B.length * FLOAT_SIZE);
        bbVertices.order(ByteOrder.nativeOrder());
        mQuadVerticesB = bbVertices.asFloatBuffer();
        mQuadVerticesB.put(QUAD_COORDS_B);
        mQuadVerticesB.position(0);


        bbVertices = ByteBuffer.allocateDirect(QUAD_COORDS_FULL.length * FLOAT_SIZE);
        bbVertices.order(ByteOrder.nativeOrder());
        mQuadVerticesFull = bbVertices.asFloatBuffer();
        mQuadVerticesFull.put(QUAD_COORDS_FULL);
        mQuadVerticesFull.position(0);


        ByteBuffer bbTexCoords = ByteBuffer.allocateDirect(
                numVertices * TEXCOORDS_PER_VERTEX * FLOAT_SIZE);
        bbTexCoords.order(ByteOrder.nativeOrder());
        mQuadTexCoord = bbTexCoords.asFloatBuffer();
        mQuadTexCoord.put(QUAD_TEXCOORDS);
        mQuadTexCoord.position(0);

        ByteBuffer bbTexCoordsTransformed = ByteBuffer.allocateDirect(
                numVertices * TEXCOORDS_PER_VERTEX * FLOAT_SIZE);
        bbTexCoordsTransformed.order(ByteOrder.nativeOrder());
        mQuadTexCoordTransformed = bbTexCoordsTransformed.asFloatBuffer();

        int vertexShader = ShaderUtil.loadGLShader(TAG, context,
                GLES20.GL_VERTEX_SHADER, R.raw.screenquad_vertex);
        int fragmentShader = ShaderUtil.loadGLShader(TAG, context,
                GLES20.GL_FRAGMENT_SHADER, R.raw.screenquad_fragment_oes);

        mQuadProgram = GLES20.glCreateProgram();
        GLES20.glAttachShader(mQuadProgram, vertexShader);
        GLES20.glAttachShader(mQuadProgram, fragmentShader);
        GLES20.glLinkProgram(mQuadProgram);
        GLES20.glUseProgram(mQuadProgram);

        ShaderUtil.checkGLError(TAG, "Program creation");

        mQuadPositionParam = GLES20.glGetAttribLocation(mQuadProgram, "a_Position");
        mQuadTexCoordParam = GLES20.glGetAttribLocation(mQuadProgram, "a_TexCoord");

        ShaderUtil.checkGLError(TAG, "Program parameters");

        swapTextures();
    }


    public void drawQuad(int texture, FloatBuffer mQuadVertices) {
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, texture);

        GLES20.glUseProgram(mQuadProgram);

        // Set the vertex positions.
        GLES20.glVertexAttribPointer(
                mQuadPositionParam, COORDS_PER_VERTEX, GLES20.GL_FLOAT, false, 0, mQuadVertices);

        // Set the texture coordinates.
        GLES20.glVertexAttribPointer(mQuadTexCoordParam, TEXCOORDS_PER_VERTEX,
                GLES20.GL_FLOAT, false, 0, mQuadTexCoordTransformed);

        // Enable vertex arrays
        GLES20.glEnableVertexAttribArray(mQuadPositionParam);
        GLES20.glEnableVertexAttribArray(mQuadTexCoordParam);

        GLES20.glDrawArrays(GLES20.GL_TRIANGLE_STRIP, 0, 4);

        // Disable vertex arrays
        GLES20.glDisableVertexAttribArray(mQuadPositionParam);
        GLES20.glDisableVertexAttribArray(mQuadTexCoordParam);

    }




    /**
     * Draws the AR background image.  The image will be drawn such that virtual content rendered
     * with the matrices provided by {@link com.google.ar.core.Camera#getViewMatrix(float[], int)}
     * and {@link com.google.ar.core.Camera#getProjectionMatrix(float[], int, float, float)} will
     * accurately follow static physical objects.
     * This must be called <b>before</b> drawing virtual content.
     *
     * @param frame The last {@code Frame} returned by {@link Session#update()}.
     */
    public void draw(Frame frame) {
        // If display rotation changed (also includes view size change), we need to re-query the uv
        // coordinates for the screen rect, as they may have changed as well.
        if (frame.hasDisplayGeometryChanged()) {
            frame.transformDisplayUvCoords(mQuadTexCoord, mQuadTexCoordTransformed);
        }

        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

        // No need to test or write depth, the screen quad has arbitrary depth, and is expected
        // to be drawn first.
        GLES20.glDisable(GLES20.GL_DEPTH_TEST);
        GLES20.glDepthMask(false);

        drawQuad(textures[0], mQuadVerticesA);
        drawQuad(textures[1], mQuadVerticesB);

        // Restore the depth state for further drawing.
        GLES20.glDepthMask(true);
        GLES20.glEnable(GLES20.GL_DEPTH_TEST);

        ShaderUtil.checkGLError(TAG, "Draw");
    }

    private static final float[] QUAD_COORDS_A = new float[]{
            -1.0f, -1.0f, 0.0f,
            -1.0f, +0.0f, 0.0f,
            +1.0f, -1.0f, 0.0f,
            +1.0f, +0.0f, 0.0f,
    };

    private static final float[] QUAD_COORDS_FULL = new float[]{
            -1.0f, -1.0f, 0.0f,
            -1.0f, +0.0f, 0.0f,
            +1.0f, -1.0f, 0.0f,
            +1.0f, +0.0f, 0.0f,
    };

    private static final float[] QUAD_COORDS_B = new float[]{
            -1.0f, -0.0f, 0.0f,
            -1.0f, +1.0f, 0.0f,
            +1.0f, -0.0f, 0.0f,
            +1.0f, +1.0f, 0.0f,
    };

    private static final float[] QUAD_TEXCOORDS = new float[]{
            0.0f, 1.0f,
            0.0f, 0.0f,
            1.0f, 1.0f,
            1.0f, 0.0f,
    };
}
