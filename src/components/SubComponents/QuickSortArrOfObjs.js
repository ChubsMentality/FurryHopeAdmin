const pivot = (nums, left, right, attributeToSort) => {
    let p = right
    let j = left
    let i = left - 1
  
    while(j <= p) {
  	    if(nums[j][attributeToSort] < nums[p][attributeToSort]) {
    	    i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        } else {
    	    j++
        }
    }
  
    i++;
    [nums[i], nums[p]] = [nums[p], nums[i]];
  
    return i
}

export const sortArray = (nums, left = 0, right = nums.length - 1, attributeToSort) => {
	if(left < right) {
  	    let pIdx = pivot(nums, left, right, attributeToSort); // Finds the pivot index
    
        sortArray(nums, left, pIdx - 1, attributeToSort); // Checks the values less than the index
        sortArray(nums, pIdx + 1, right, attributeToSort); // Checks the values greater than the index
    }
  
    return nums
}

// var sortedArrOfObjs = sortArray(arrOfObjs, 0, arrOfObjs.length - 1, 'breed')
// console.log(sortedArrOfObjs)