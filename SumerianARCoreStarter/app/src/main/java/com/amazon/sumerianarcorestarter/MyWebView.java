package com.amazon.sumerianarcorestarter;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.webkit.WebView;

interface DrawCallback {
    void onDraw();
}

public class MyWebView extends WebView {

    DrawCallback drawCallback;

    public MyWebView(Context context) {
        super(context);
    }

    public MyWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public void setOnDrawCallback(DrawCallback callback)
    {
        drawCallback = callback;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        if (drawCallback != null) {
            drawCallback.onDraw();
        }

    }
}
