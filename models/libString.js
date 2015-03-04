module.exports = {
	htmlEntities: function(stringToClean){
		return String(stringToClean).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
}