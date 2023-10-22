describe("home.cy.ts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.intercept(
      {
        method: "POST",
        url: "/url-shortener*",
      },
      { shortUrl: "http://localhost:4000/D41d1fcs" }
    ).as("shortenUrl");
  });

  it("should display a headline/input box/button", () => {
    cy.get("h1").contains("URL Shortener");
  });

  describe("when valid url is entered", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "POST",
          url: "/url-shortener*",
        },
        { shortUrl: "http://localhost:4000/D41d1fcs" }
      ).as("shortenUrl");
    });

    it("should generate a short url", () => {
      cy.get("input#url").type(
        "https://mothership.sg/2023/10/singapore-circus-fire/"
      );
      cy.get("button").click();
      cy.contains("http://localhost:4000/D41d1fcs");
    });
  });

  describe("when no url is entered", () => {
    it("should display error message", () => {
      cy.get("button").click();
      cy.contains("Please set a URL");
    });
  });

  describe("when invalid url is entered", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "POST",
          url: "/url-shortener*",
        },
        {
          statusCode: 400,
          body: {
            message: ["url must be a URL address"],
            error: "Bad Request",
            statusCode: 400,
          },
        }
      ).as("shortenUrl");
    });

    it("should display error message", () => {
      cy.get("input#url").type("random string");
      cy.get("button").click();
      cy.contains("url must be a URL address");
    });
  });
});
