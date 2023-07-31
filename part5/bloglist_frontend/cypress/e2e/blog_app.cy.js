describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Typing Tester",
      username: "TipingTaster",
      password: "secretWord"
    }
    const secondUser = {
      name: "Hasty Hoper",
      username: "HastyHoper",
      password: "sacredWord"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('TipingTaster')
      cy.get('#password').type('secretWord')
      cy.get("#login-button").click()
      cy.contains("Logged in as Typing Tester")
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('TipingTaster')
      cy.get('#password').type('knownWord')
      cy.get("#login-button").click()
      cy.contains("Wrong credentials")
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'TipingTaster', password: 'secretWord'})
    })

    it('A blog can be created', function() {
      cy.get('#BlogFormShow').click()
      cy.get('#title').type('testing title')
      cy.get('#author').type('testing author')
      cy.get('#url').type('testing url')
      cy.get('#blogCreateButton').click()
      cy.contains("Blog testing title added")
      cy.contains("testing title testing author")
    })
  })

  describe('After login and blog has been created', function() {
    beforeEach(function(){
      cy.login({username: 'TipingTaster', password: 'secretWord'})
      const blog = {
        title: "testing title",
        author: "testing author",
        url: "testing url"
      }
      cy.addBlog(blog)
      
    })

    it('A blog can be liked', function() {
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed', function() {
      cy.get('#view').click()
      cy.get('#remove').click()
      cy.get('#view').should('not.exist')
    })
    
    it('Only the user who has added the blog can remove the blog', function() {
      cy.get('#logOut-button').click()
      cy.get('#username').type('HastyHoper')
      cy.get('#password').type('sacredWord')
      cy.get("#login-button").click()

      cy.get('#view').click()
      cy.get('#remove').should('not.exist')
    })
  })

  describe('Blogs are shown in the order of how many likes they have', function() {
    beforeEach(function(){
      cy.login({username: 'TipingTaster', password: 'secretWord'})

      const blog1 = {
        "title": 'blog1',
        "author": 'anonym',
        "url": 'anon',
        "likes": 20
      }
      const blog2 = {
        "title": 'blog2',
        "author": 'anonym',
        "url": 'anon',
        "likes": 10
      }
      const blog3 = {
        "title": 'blog3',
        "author": 'anonym',
        "url": 'anon',
        "likes": 30
      }
      const blog4 = {
        "title": 'blog4',
        "author": 'anonym',
        "url": 'anon',
        "likes": 40
      }
     
      cy.addBlog(blog1)
      cy.addBlog(blog2)
      cy.addBlog(blog3)
      cy.addBlog(blog4)
    })

    it('blog test', function() {
      cy.get('[data-testid="blog"]').should('have.length', 4).as('blogs')
      cy.get('@blogs').eq(0).should('contain.text', 'blog4')
      cy.get('@blogs').eq(1).should('contain.text', 'blog3')
      cy.get('@blogs').eq(2).should('contain.text', 'blog1')
      cy.get('@blogs').eq(3).should('contain.text', 'blog2')
    })
  })

})