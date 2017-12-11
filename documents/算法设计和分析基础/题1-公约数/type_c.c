/*
 * @Author: wusz 
 * @Date: 2017-12-11 15:35:45 
 * @Last Modified by: wusz
 * @Last Modified time: 2017-12-11 17:32:58
 */

#include <stdio.h>

/*! 声明 */
int gcd(int m, int n);
int gcdEx(int m, int n, int *x, int *y);

int main() {
    printf("%d\n", gcd(160, 124));
    int x, y;
    printf("(%d, %d, %d)", gcdEx(24, 60, &x, &y), x, y);
}

/*! 欧几里得算法 最大公约数 */
int gcd(int m, int n) {
    if (n == 0) return m;
    return gcd(n, m%n);
}

/*! 扩展欧几里得算法mx + ny = d */
int gcdEx(int m, int n, int *x, int *y) {
    if (n == 0) {
        *x = 1, *y = 0;
        return m;
    }
    int r = gcdEx(n, m%n, x, y);
    int t = *x;
    *x = *y;
    *y = t - m/n * *y;
    return r;
}



