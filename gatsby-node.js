exports.createPages = async ({ graphql, actions }) => {

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      query Article {
        allNodeArticle {
          edges {
            node {
              title
              id
              path {
                alias
              }
              body {
                value
              }
            }
          }
        }
      }    
    `
  )

  if (result.errors) {
    throw result.errors
  }

  result.data.allNodeArticle.edges.forEach((node) => {
    actions.createPage({
      path: node.path.alias,
      component: blogPost,
      context: {
        articleId: node.id
      },
    })
  })
}

