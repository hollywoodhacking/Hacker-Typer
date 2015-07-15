/// <reference path="../jasmine.d.ts" />
define(["require", "exports", 'Editor/Typer'], function (require, exports, Typer) {
    describe('Typer', function () {
        var typer;
        beforeEach(function () {
            typer = new Typer();
        });
        it('should return a letter at a time when using typeSingleLetter', function () {
            typer.setText('someText');
            typer.typeSingleLetter();
            expect(typer.getText()).toBe('s');
        });
        it('should jump over \\t characters and return the next character when using typeSingleLetter', function () {
            typer.setText('\tabcdef');
            typer.typeSingleLetter();
            expect(typer.getText()).toBe('\ta');
        });
        it('should remove one letter at a time when using backspace', function () {
            typer.setText('abcdefghijklmnopqrstuvwxyz');
            for (var i = 0; i < 5; i++) {
                typer.typeSingleLetter();
            }
            expect(typer.getText()).toBe('abcde');
            typer.backspace();
            expect(typer.getText()).toBe('abcd');
        });
        it('should return up to the end of the word when using typeFullWord', function () {
            typer.setText('This is a sentence.');
            typer.typeFullWord();
            expect(typer.getText()).toBe('This');
        });
        it('should return up to the end of the word for dot delimited code structures', function () {
            typer.setText('this.is.a.code.sentence');
            typer.typeFullWord();
            typer.typeFullWord();
            expect(typer.getText()).toBe('this.is');
        });
        it('should return up to beginning of the next line when using typeFullLine', function () {
            typer.setText('This is a full line\nThis is the second line');
            typer.typeFullLine();
            expect(typer.getText()).toBe('This is a full line\n');
        });
    });
});
