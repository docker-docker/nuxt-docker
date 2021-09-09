module.exports = function robots (req, res, next) {
  // only search-index www subdomain
  if (req.hostname.slice(0, 3) !== 'www') {
    res.set('X-Robots-Tag', 'noindex, nofollow')
  }
  next()
}
