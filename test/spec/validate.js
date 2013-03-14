define([
  './util'
],
function (util) {
  describe('validation', function () {
    var iframe = document.querySelector('iframe');
    var frameDoc;

    describe('when the widget is first rendered', function () {
      before(function (done) {
        iframe.src = '/test/assets/test-validate.html?initial-state';
        util.waitOnFrame(iframe, function () {
          frameDoc = iframe.contentDocument;
          done();
        });
      });

      it('the invalid class is not applied', function () {
        var $widget = $(frameDoc).find(util.getWidgetSelector(''));

        expect($widget.hasClass(util.getWidgetClass('invalid'))).
          to.be(false);

        expect($widget.find(util.getWidgetSelector('invalid')).length).
          to.be(0);
      });
    });

    describe('on blur', function () {
      var DELAY = 20;

      before(function (done) {
        iframe.src = '/test/assets/test-validate.html?blur';
        util.waitOnFrame(iframe, function () {
          frameDoc = iframe.contentDocument;
          done();
        });
      });

      it('the area code input validates', function (done) {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var $input =
          $(widget.querySelector(util.getWidgetSelector('area-code')));
        var otherInput =
          $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
        var input = $input[0];

        Q.fcall(function () {
            input.focus();
          }).
          then(function () {
            otherInput.focus();
            // wait a bit extra for IE 9
            return Q.delay(DELAY * 2);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(42);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(512);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).
              to.be(false);
            input.focus();
            $input.val('');
            done();
          }).
          fail(done);
      });

      it('the prefix input validates', function (done) {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var $input =
          $(widget.querySelector(util.getWidgetSelector('prefix')));
        var otherInput =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var input = $input[0];


        Q.fcall(function () {
            input.focus();
          }).
          then(function () {
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(42);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(512);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).
              to.be(false);
            input.focus();
            $input.val('');
            done();
          }).
          fail(done);
      });

      it('the line number input validates', function (done) {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var $input =
          $(widget.querySelector(util.getWidgetSelector('line-no')));
        var otherInput =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var input = $input[0];


        Q.fcall(function () {
            input.focus();
          }).
          then(function () {
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(422);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).to.be(true);
            input.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            $input.val(1234);
            otherInput.focus();
            return Q.delay(DELAY);
          }).
          then(function () {
            expect($input.hasClass(util.getWidgetClass('invalid'))).
              to.be(false);
            input.focus();
            $input.val('');
            done();
          }).
          fail(done);
      });
    });

    describe('on submit', function () {
      before(function (done) {
        iframe.src = '/test/assets/test-validate.html?submit';
        util.waitOnFrame(iframe, function () {
          frameDoc = iframe.contentDocument;
          done();
        });
      });

      it('marks any invalid number parts', function () {
        var widget = frameDoc.querySelector(util.getWidgetSelector(''));
        var areaCode =
          $(widget.querySelector(util.getWidgetSelector('area-code')))[0];
        var prefix =
          $(widget.querySelector(util.getWidgetSelector('prefix')))[0];
        var lineNo =
          $(widget.querySelector(util.getWidgetSelector('line-no')))[0];
        var submitButton =
          $(widget.querySelector(util.getWidgetSelector('submit-btn')))[0];
        var invalidClass = util.getWidgetClass('invalid');

        $(submitButton).click();
        expect($(areaCode).hasClass(invalidClass)).to.be(true);
        expect($(prefix).hasClass(invalidClass)).to.be(true);
        expect($(lineNo).hasClass(invalidClass)).to.be(true);
        expect($(widget).hasClass(invalidClass)).to.be(true);

        $(areaCode).val(512);
        $(submitButton).click();
        expect($(areaCode).hasClass(invalidClass)).to.be(false);
        expect($(prefix).hasClass(invalidClass)).to.be(true);
        expect($(lineNo).hasClass(invalidClass)).to.be(true);
        expect($(widget).hasClass(invalidClass)).to.be(true);

        $(prefix).val(555);
        $(submitButton).click();
        expect($(areaCode).hasClass(invalidClass)).to.be(false);
        expect($(prefix).hasClass(invalidClass)).to.be(false);
        expect($(lineNo).hasClass(invalidClass)).to.be(true);
        expect($(widget).hasClass(invalidClass)).to.be(true);

        $(lineNo).val(1234);
        $(submitButton).click();
        expect($(areaCode).hasClass(invalidClass)).to.be(false);
        expect($(prefix).hasClass(invalidClass)).to.be(false);
        expect($(lineNo).hasClass(invalidClass)).to.be(false);
        expect($(widget).hasClass(invalidClass)).to.be(false);
      });
    });
  });
});

