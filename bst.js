class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = null;
        this.tree = this.buildTree(array);
    }

    buildTree(array) {
        this.array = this.removeDuplicates(array);
        this.array = this.mergeSort(this.array);

        let start = 0;
        let end = array.length();
        let mid = Math.floor((start + end) / 2);
        this.root = new Node(array[mid]);

        let rootNode = new Node(array[mid]);
        rootNode.left = buildTree(array.slice(0, mid));
        rootNode.right = buildTree(array.slice(mid + 1));

        return rootNode;
    }

    removeDuplicates(array) {
         return [... new Set(array)];
    }

    mergeSort(array) {
        // Base case: if the array has one or zero elements, it is already sorted
        if (array.length <= 1) {
            return array;
        }
    
        // Split the array into two halves
        const middleIndex = Math.floor(array.length / 2);
        const leftArray = array.slice(0, middleIndex);
        const rightArray = array.slice(middleIndex);
    
        // Recursively sort both halves
        const sortedLeftArray = mergeSort(leftArray);
        const sortedRightArray = mergeSort(rightArray);
    
        // Merge the sorted halves
        return merge(sortedLeftArray, sortedRightArray);
    }
    
    merge(leftArray, rightArray) {
        let sortedArray = [];
        let leftIndex = 0;
        let rightIndex = 0;
    
        // Compare the elements of both arrays and push the smaller one to the sorted array
        while (leftIndex < leftArray.length || rightIndex < rightArray.length) {
            if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
                if (leftArray[leftIndex] < rightArray[rightIndex]) {
                    sortedArray.push(leftArray[leftIndex]);
                    leftIndex++;
                } else {
                    sortedArray.push(rightArray[rightIndex]);
                    rightIndex++;
                }
            } else if (leftIndex < leftArray.length) {
                sortedArray.push(leftArray[leftIndex]);
                leftIndex++;
            } else {
                sortedArray.push(rightArray[rightIndex]);
                rightIndex++;
            }
        }
    
        return sortedArray;
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

