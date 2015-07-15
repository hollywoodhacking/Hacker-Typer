/// <reference path="../jasmine.d.ts" />
define(["require", "exports", 'Terminal/TerminalOutput'], function (require, exports, TerminalOutput) {
    describe('TerminalOutput', function () {
        describe('getNext', function () {
            var terminalOutput;
            beforeEach(function () {
                terminalOutput = new TerminalOutput();
            });
            it('returns a full line when called', function () {
                terminalOutput.setText('line 1\nline2');
                expect(terminalOutput.getText()).toBe('line 1\n');
            });
            it('returns the second line when called twice', function () {
                terminalOutput.setText('line 1\nline2');
                terminalOutput.getText();
                expect(terminalOutput.getText()).toBe('line2\n');
            });
            it('enters single letter mode when a line begins with %', function () {
                terminalOutput.setText('line 1\n%input');
                terminalOutput.getText();
                expect(terminalOutput.getText()).toBe('%STOP');
                expect(terminalOutput.getText()).toBe('i');
                expect(terminalOutput.getText()).toBe('n');
            });
            it('enters full line mode when input mode ends', function () {
                terminalOutput.setText('line 1\n%i\nline 3');
                terminalOutput.getText();
                terminalOutput.getText();
                terminalOutput.getText();
                expect(terminalOutput.getText()).toBe('\n');
                expect(terminalOutput.getText()).toBe('%START');
                expect(terminalOutput.getText()).toBe('line 3\n');
            });
            it('goes back into single letter mode when a line begins with %', function () {
                terminalOutput.setText('line 1\n%123\nline 3\n%123');
                var i = 6;
                while (i--) {
                    terminalOutput.getText();
                }
                expect(terminalOutput.getText()).toBe('%START');
                expect(terminalOutput.getText()).toBe('line 3\n');
                expect(terminalOutput.getText()).toBe('%STOP');
                expect(terminalOutput.getText()).toBe('1');
            });
            it('returns \'\' when there is no text', function () {
                expect(terminalOutput.getText()).toBe('');
            });
            it('returns %STOP when the output has finished then alternates with newline', function () {
                terminalOutput.setText('1');
                terminalOutput.getText();
                expect(terminalOutput.getText()).toBe('%STOP');
                expect(terminalOutput.getText()).toBe('\n');
            });
        });
    });
});
