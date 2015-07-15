/// <reference path="../AppDefinitions.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var TerminalOutput = (function () {
        function TerminalOutput() {
            this.charCount = 0;
            this.lineCount = 0;
        }
        TerminalOutput.prototype.setText = function (text) {
            this.lines = text.split('\n');
        };
        TerminalOutput.prototype.getText = function () {
            var nextOutput;
            if (_(this.lines).isUndefined()) {
                nextOutput = '';
            }
            else if (this.lineCount >= this.lines.length) {
                if (this.lastOutput === '%STOP') {
                    nextOutput = '\n';
                }
                else {
                    nextOutput = '%STOP';
                }
            }
            else if (this.isCurrentLineInput()) {
                nextOutput = this.getNextLetter();
            }
            else {
                nextOutput = this.getLine();
                this.lineCount++;
            }
            this.lastOutput = nextOutput;
            return nextOutput;
        };
        TerminalOutput.prototype.isCurrentLineInput = function () {
            var currentLine = this.lines[this.lineCount];
            return currentLine.charAt(0) === '%';
        };
        TerminalOutput.prototype.getLine = function () {
            return this.lines[this.lineCount] + '\n';
        };
        TerminalOutput.prototype.getNextLetter = function () {
            var currentLine = this.lines[this.lineCount];
            var nextLetter = currentLine.charAt(this.charCount);
            if (this.charCount > currentLine.length) {
                nextLetter = '%START';
                this.gotoNextLine();
            }
            else {
                if (this.charCount === currentLine.length) {
                    nextLetter = '\n';
                }
                else if (this.charCount === 0) {
                    nextLetter = '%STOP';
                }
                this.charCount++;
            }
            return nextLetter;
        };
        TerminalOutput.prototype.gotoNextLine = function () {
            this.lineCount++;
            this.charCount = 0;
        };
        return TerminalOutput;
    })();
    return TerminalOutput;
});
