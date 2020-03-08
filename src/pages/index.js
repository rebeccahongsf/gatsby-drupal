import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = () => {
  const posts = graphql`
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

  return (
    <Layout>
      <Bio />
      <StaticQuery
        query={posts}
        render={({allNodeArticle}) => (
          <div>
            {allNodeArticle.edges.map(({node}) => 
            <article
              key={ node.id }
            >
              <h2>{node.title}</h2>
              <div dangerouslySetInnerHTML={{__html: node.body.value}} />
            </article>
            )}
          </div>
        )}
      />
    </Layout>
  )
}

export default BlogIndex
