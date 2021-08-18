describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', {
      name: 'asd',
      username: 'asd',
      password: 'asd'
    })
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('asd')
      cy.get('#password').type('asd')
      cy.contains('login').click()
      cy.contains('logging in was successful')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('asdi')
      cy.get('#password').type('asdi')
      cy.contains('login').click()
      cy.contains('wrong credentials, try again')
    })

  })
  describe('When logged in', function() {
    function login() {
      cy.get('#username').type('asd')
      cy.get('#password').type('asd')
      cy.contains('login').click()
    }
    function create(title,author,url) {
      cy.contains('create new blog').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.contains('Create').click()
    }

    beforeEach(function() {
      login()
    })
    it('A blog can be created', function() {
      create('el titel','kirjuri','www.fi')
    })
    it('A blog can be liked', function() {
      create('el titel','kirjuri','www.fi')
      cy.contains('Show').click()
      cy.contains('likes 0')
      cy.contains('Like').click()
      cy.contains('likes 1')
    })
    it('the blogs are sorted', function() {
      create('el titel','kirjuri1','www.fi')
      cy.get('#kirjuri1').contains('Show').click()
      cy.get('#kirjuri1').contains('Like').click()
      cy.get('#kirjuri1').contains('Like').click()
      create('el titel2','kirjuri2','www.fi2')
      cy.get('#kirjuri2').contains('Show').click()
      cy.get('#kirjuri2').contains('Like').click()
      cy.get('#kirjuri2').contains('Like').click()
      cy.get('#kirjuri2').contains('Like').click()
      cy.get('#kirjuri2').contains('Like').click()
      create('el titel3','kirjuri3','www.fi3')
      cy.get('#kirjuri3').contains('Show').click()
      cy.get('#kirjuri3').contains('Like').click()
      cy.get('.blogComponent').eq(0).contains('kirjuri2')
      cy.get('.blogComponent').eq(1).contains('kirjuri1')
      cy.get('.blogComponent').eq(2).contains('kirjuri3')
    })
    it('A blog can be deleted', function() {
      create('el titel','kirjuri','www.fi')
      cy.get('#deleteButton').click()
      cy.get('#deleteButton').click()
    })
  })

})
