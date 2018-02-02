const { promisify } = require('util')

const giphy = require('giphy-api')({
  https: true,
  timeout: 20
})

const giphyRandom = promisify(giphy.random.bind(giphy))

module.exports = (robot) => {
  robot.log('Yay, the app was loaded!')
  robot.on('pull_request.closed', async context => {
    const gif = await giphyRandom({ q: 'kitten', rating: 'g', fmt: 'json' })
    const body = `<img src="${gif[0].images.url}" width=400 />`
    const params = context.issue({ body })

    return context.github.issues.createComment(params)
  })
}
