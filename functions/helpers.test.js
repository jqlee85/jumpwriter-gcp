const myMethods = require('./helpers')
const {getArticle, getThreeWordPrompt, getAutoId} = myMethods

describe('getArticle()', () => {

  it('returns a for a word', () => {
    const noun = 'potato'
    const expectedOutput = 'a'
    expect(
      getArticle(noun)
    ).toEqual(
      expectedOutput
    )
  })

  it('returns an for an word', () => {
    const noun = 'apple'
    const expectedOutput = 'an'
    expect(
      getArticle(noun)
    ).toEqual(
      expectedOutput
    )
  })

  it('returns an for exception word', () => {
    const noun = 'honorable'
    const expectedOutput = 'an'
    expect(
      getArticle(noun)
    ).toEqual(
      expectedOutput
    )
  })

  it('returns a for exception word', () => {
    const noun = 'use'
    const expectedOutput = 'a'
    expect(
      getArticle(noun)
    ).toEqual(
      expectedOutput
    )
  })

})

describe('getThreeWordPrompt()', () => {

  it('returns properly formatted three word prompt', () => {
    const noun = 'story'
    const verb = 'tell'
    const expectedOutput = 'tell a story'
    expect(
      getThreeWordPrompt(verb, noun)
    ).toEqual(
      expectedOutput
    )
  })

})

describe('getAutoId()', () => {

  it('gets legitimate autoid of 20 chars', () => {
    expect(getAutoId().length).toEqual(20)
  })

})