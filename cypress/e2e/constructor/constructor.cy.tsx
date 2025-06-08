/// <reference types="cypress" />

const ingredientsContent = '[data-cy=ingredients]';
const constructorContent = '[data-cy=constructor]';

describe('тест работы страницы "/" - Соберите бургер', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'someAccessToken');
    localStorage.setItem('refreshToken', 'someRefreshToken');

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('**/ingredients', { fixture: 'ingredients.json' });

    cy.viewport('macbook-16');
    cy.visit('');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.clear();
  });

  it('тест: добавление ингредиентов в конструктор', () => {
    cy.addIngredient('Краторная');
    cy.addIngredient('Биокотлета');
    cy.addIngredient('Антарианского');

    cy.checkIngredientCount('Краторная', 2);
    cy.checkIngredientCount('Биокотлета', 1);
    cy.checkIngredientCount('Антарианского', 1);
  });

  it('тест: проверка работы модального окна', () => {
    cy.getModal().should('exist');
    cy.getModal().children().should('have.length', 0);

    const bunButton = cy.get(ingredientsContent).contains('Краторная').parent();
    bunButton.click();

    cy.getModal().children().should('have.length', 2);
    cy.getModal().contains('Детали');
    cy.getModal().contains('Краторная');

    cy.getModal().find('button').should('exist').click();
    cy.getModal().children().should('have.length', 0);

    bunButton.click();
    cy.getModal().children().should('have.length', 2);
    cy.getModal().children().last().click({ force: true });
    cy.getModal().children().should('have.length', 0);
  });

  it('тест: создание заказа', () => {
    cy.addIngredient('Краторная');
    cy.addIngredient('Биокотлета');
    cy.addIngredient('Антарианского');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'postOrders'
    );
    cy.get(constructorContent).contains('Оформить заказ').click();
    cy.wait('@postOrders');

    cy.getModal().children().should('have.length', 2);
    cy.getModal().contains('80457');
    cy.getModal().find('button').click();
    cy.getModal().children().should('have.length', 0);

    cy.get(constructorContent).should('contain', 'Выберите булки');
    cy.get(constructorContent).should('contain', 'Выберите начинку');
  });
});
