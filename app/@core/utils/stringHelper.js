module.exports = {

	isPalindrome: function(str){
		let length = str.length;
		for (let i = 0; i < length/2; i++) {
			if (str[i].toLowerCase() !== str[length - 1 - i].toLowerCase()) {
				return false;
			}
		}
		return true;
	}
};
