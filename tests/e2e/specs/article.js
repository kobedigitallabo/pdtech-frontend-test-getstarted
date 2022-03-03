describe('記事画面テストサンプル', () => {
  it('画面に記事登録ができる', () => {
    cy.visit('/')
    // まだ登録してない場合、リストに一件もない
    cy.get('#article_list li.article_item').should('not.exist');

    cy.get('input.article_title').type('記事1')
    cy.get('input.article_author').type('太郎')
    cy.get('button.add_article').click()

    // 登録した内容がリストに反映される。
    cy.get('#article_list li.article_item').its('length').should('equal', 1);
    cy.get('#article_list li.article_item').contains('記事1')
  })
})
