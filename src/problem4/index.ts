function sum_to_n_a(n: number): number {
  // Complexity: O(n - 1)
  let sum = 1;
  for (let i = 2; i <= n; i++) {
    sum += i
  }
  return sum
};

function sum_to_n_b(n: number): number {
  // Complexity: O(n - 1)
  return calcNewSum(2, 1, n)
};

function sum_to_n_c(n: number): number {
  // Complexity: O(1)
  return (n * (n + 1)) / 2
};

function main() {
  const n = 100;
  console.log('The first solution')
  console.log(sum_to_n_a(n))

  console.log('The second solution')
  console.log(sum_to_n_b(n))

  console.log('The third solution')
  console.log(sum_to_n_c(n))
}


main()

/**
 utils
 */

function calcNewSum(value: number, oldSum: number, n: number): number {
  if (value > n) {
    return oldSum;
  }
  return calcNewSum(value + 1, oldSum + value, n)
}
