/*
 * @Author: wusz 
 * @Date: 2017-12-04 16:12:19 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-04 16:22:38
 */

/*! 题目: 
 *    在一个数组里面移除指定value, 并且返回新的数组长度。不能新建另一个数组。
 */

/*! c */
int removeElement(int A[], int n, int elem) {
    int i, j = 0;
    for(i=0; i<n; i++) {
        if(A[i] == elem) {
            continue;
        }
        A[j] = A[i];
        j++;
    }
    return j;
}
int A[] = [1,2,2,3,2,4];
int length = removeElement(A, 6, 2);
print(length);