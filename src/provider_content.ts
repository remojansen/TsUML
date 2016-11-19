function getContent(url: string) {

    const logo = "data:image/png;base64,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" +
        "AAAElFTkSuQmCC";

    let css = `
        body {
            background-color: #363746;
        }
        .powered {
            position: fixed;
            bottom: 15px;
            right: 25px;
            color: #ffffff;
            text-align: center;
        }
        .powered img {
            width: 90px;
            margin-top: -10px;
        }
        .tip {
            color: #ffffff;
            position: fixed;
            bottom: 15px;
            left: 25px;
            font-size: 10px;
            max-width: 65%;
        }
    `;

    let js = `
        var canvas = document.getElementsByTagName('canvas')[0];
        var gkhead = new Image;

        var draw = function() {

            canvas.width = window.innerWidth - 5;
            canvas.height = window.innerHeight - 100;

            var ctx = canvas.getContext('2d');
            trackTransforms(ctx);

            function redraw() {

                // Clear the entire canvas
                var p1 = ctx.transformedPoint(0, 0);
                var p2 = ctx.transformedPoint(canvas.width, canvas.height);
                ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.restore();

                ctx.drawImage(gkhead, 0, 0);

            }
            redraw();

            var lastX = canvas.width / 2,
                lastY = canvas.height / 2;

            var dragStart, dragged;

            canvas.addEventListener('mousedown', function(evt) {
                document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
                lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                dragStart = ctx.transformedPoint(lastX, lastY);
                dragged = false;
            }, false);

            canvas.addEventListener('mousemove', function(evt) {
                lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                dragged = true;
                if (dragStart) {
                    var pt = ctx.transformedPoint(lastX, lastY);
                    ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                    redraw();
                }
            }, false);

            canvas.addEventListener('mouseup', function(evt) {
                dragStart = null;
                if (!dragged) zoom(evt.shiftKey ? -1 : 1);
            }, false);

            var scaleFactor = 1.1;

            var zoom = function(clicks) {
                var pt = ctx.transformedPoint(lastX, lastY);
                ctx.translate(pt.x, pt.y);
                var factor = Math.pow(scaleFactor, clicks);
                ctx.scale(factor, factor);
                ctx.translate(-pt.x, -pt.y);
                redraw();
            }

            var handleScroll = function(evt) {
                var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
                if (delta) zoom(delta);
                return evt.preventDefault() && false;
            };

            canvas.addEventListener('DOMMouseScroll', handleScroll, false);
            canvas.addEventListener('mousewheel', handleScroll, false);
        };

        gkhead.src = '${url}';

        // Adds ctx.getTransform() - returns an SVGMatrix
        // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
        function trackTransforms(ctx) {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            var xform = svg.createSVGMatrix();
            ctx.getTransform = function() {
                return xform;
            };

            var savedTransforms = [];
            var save = ctx.save;
            ctx.save = function() {
                savedTransforms.push(xform.translate(0, 0));
                return save.call(ctx);
            };

            var restore = ctx.restore;
            ctx.restore = function() {
                xform = savedTransforms.pop();
                return restore.call(ctx);
            };

            var scale = ctx.scale;
            ctx.scale = function(sx, sy) {
                xform = xform.scaleNonUniform(sx, sy);
                return scale.call(ctx, sx, sy);
            };

            var rotate = ctx.rotate;
            ctx.rotate = function(radians) {
                xform = xform.rotate(radians * 180 / Math.PI);
                return rotate.call(ctx, radians);
            };

            var translate = ctx.translate;
            ctx.translate = function(dx, dy) {
                xform = xform.translate(dx, dy);
                return translate.call(ctx, dx, dy);
            };

            var transform = ctx.transform;
            ctx.transform = function(a, b, c, d, e, f) {
                var m2 = svg.createSVGMatrix();
                m2.a = a;
                m2.b = b;
                m2.c = c;
                m2.d = d;
                m2.e = e;
                m2.f = f;
                xform = xform.multiply(m2);
                return transform.call(ctx, a, b, c, d, e, f);
            };

            var setTransform = ctx.setTransform;
            ctx.setTransform = function(a, b, c, d, e, f) {
                xform.a = a;
                xform.b = b;
                xform.c = c;
                xform.d = d;
                xform.e = e;
                xform.f = f;
                return setTransform.call(ctx, a, b, c, d, e, f);
            };

            var pt = svg.createSVGPoint();
            ctx.transformedPoint = function(x, y) {
                pt.x = x;
                pt.y = y;
                return pt.matrixTransform(xform.inverse());
            }
        }

        window.onresize = function(event) {
            draw();
        };

        window.onload = function() {
            draw();
        }

    `;

    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>TsUML</title>
                <style>${css}</style>
            </head>
            <body>
                <canvas></canvas>
                <!-- img src="${url}"></div -->
                <div class="powered">
                    <img src="${logo}"></img>
                </div>
                <script>${js}</script>
            </body>
        </html>
    `;

    return html;

};

export { getContent };
