define(["require", "exports"], function(require, exports) {
    function get() {
        return '<!DOCTYPE HTML><html lang="en">	<head>		<meta charset="utf-8"> 		<title></title>		<link href="style/style.css" rel="stylesheet" type="text/css" /> 		<link href="script/third-party/codemirror/codemirror.css" rel="stylesheet" type="text/css" /> 	</head> 	<body>		<!--<div><span id="debug"></span></div>-->		<div id="stage"></div>        <!-- third party libs -->		<script src=\'//ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js\'></script>		<script src="script/third-party/codemirror/codemirror-compressed.js"></script>        <script src="bower_components/underscore/underscore-min.js"></script>		<script data-main="script/app/bootstrap" src=\'bower_components/requirejs/require.js\'></script>	</body></html>';
    }
    exports.get = get;
});
//# sourceMappingURL=index.html.js.map
