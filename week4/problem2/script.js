
//Task 1 - List all of the post titles having more than six words
fetch("http://jsonplaceholder.typicode.com/posts")//GET api request
    .then((response) => response.json())
    .then((data) => {
        const result = data
        .filter((post) => post.title.split(" ").length > 6)//.filter() posts > 6 
        .map((post) => post.title); 
    

    console.log('The following post titles have over 6 words:');        
    console.log(result);
}) 


//Task 2 - Show a word frequency map for all of the body contents of the posts
fetch("http://jsonplaceholder.typicode.com/posts")//GET api request 
    .then((response) => response.json())
    .then((data) => {   

        const body_arr = data.map((post) => post.body);
        const all_bodies = body_arr.join(' ');//append all bodies into single string
        
    //convert all_bodies into words and count the frequency
    const wordFreq = all_bodies
        .toLowerCase()
        .split(/\s+/) //.split() via whitespace
        .filter((word) => word.length > 0)//filter empty entries
        .reduce((frequencyMap, word) => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1; //increment count for each word
        return frequencyMap;
        }, {});
    
    console.log('Word frequency:');
    console.log(wordFreq);
})