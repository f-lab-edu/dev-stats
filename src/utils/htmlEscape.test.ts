import { escape, unescape } from "./htmlEscape";

describe("htmlEscape", () => {
  describe("escape", () => {
    it("should return an empty string when the input string is empty", () => {
      expect(escape("")).toEqual("");
    });

    it("should escape all special characters in the input string", () => {
      expect(
        escape("<div className='text-bold'>& \"hello\" 'world' <>&</div>"),
      ).toEqual(
        "&lt;div className=&#39;text-bold&#39;&gt;&amp; &quot;hello&quot; &#39;world&#39; &lt;&gt;&amp;&lt;/div&gt;",
      );
    });
  });

  describe("unescape", () => {
    it("should return an empty string when the input string is empty", () => {
      expect(unescape("")).toEqual("");
    });

    it("should unescape special characters in the input string", () => {
      expect(
        unescape(
          "&lt;div className=&#39;text-bold&#39;&gt;hello world!&lt;/div&gt;",
        ),
      ).toEqual("<div className='text-bold'>hello world!</div>");
    });
  });
});
