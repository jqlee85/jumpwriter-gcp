const getThreeWordPrompt = (verb, noun) => {
  return verb + ' ' + getArticle(noun) + ' ' + noun
}

const getArticle = ( noun=false ) => {
	if ( !noun ) return 'a'
  let vowels = ['a','e','i','o','u'];
	let exceptions = ['hour','unique','universal','honor','honorable','honest','honesty','one','unicorn','use','union','ubiquitous','united','used'];
	let an = false
  
  // Check first words of noun for vowel
  for (let i=0;i<vowels.length;i++) {
    if ( vowels[i] === noun.slice(0,1) ) {
			an = true
			break
		}
  }
  
  // Flip value for exception words
  if ( exceptions.includes(noun)) {
		an = !an
	}
  
  // Return 'an' or 'a'
  if (an) return 'an'
	else return 'a'
}

const getAutoId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let autoId = ''
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return autoId
}

// Exports
module.exports =  {
  getAutoId: getAutoId,
  getArticle: getArticle,
  getThreeWordPrompt: getThreeWordPrompt
}