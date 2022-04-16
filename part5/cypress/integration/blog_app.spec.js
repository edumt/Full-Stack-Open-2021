describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "test",
      name: "test",
      password: "test",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("test logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("asdf");
      cy.get("#password").type("asdf");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });
});
