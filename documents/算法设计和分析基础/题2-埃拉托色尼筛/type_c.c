/*
 * @Author: wusz 
 * @Date: 2017-12-11 15:35:45 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-11 16:05:20
 */

#include <stdio.h>

/*! 声明 */
int sieve(int n);

int main() {
    printf("%d", sieve(160));
}

/*! 返回连续质数序列 */
int sieve(int n) {
    int A[n-1];
    for (int i=2; i<=n; i++) {
        A[i-2] = i;
    }
}



