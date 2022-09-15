const formatName = (content) =>{

    const stringTrim = content.replaceAll(" ", '');
    const stringLower = stringTrim.toLowerCase();

    return stringLower;

} 


module.exports = formatName