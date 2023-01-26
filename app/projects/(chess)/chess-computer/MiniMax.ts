export const test = () => {};

// import { Children, TreeNode } from "./DecisionTree";

// const maxNode = <T>(array: Children<T>) => {
//     return array.reduce(
//         (max, node) => {
//             return max.max > node.getValue() ? max : { max: node.getValue(), node: node };
//         },
//         {
//             max: -Infinity,
//             node: {} as TreeNode<T>,
//         }
//     ).node;
// };

// const minNode = <T>(array: Children<T>) => {
//     return array.reduce(
//         (min, node) => {
//             return min.min < node.getValue() ? min : { min: node.getValue(), node: node };
//         },
//         {
//             min: Infinity,
//             node: {} as TreeNode<T>,
//         }
//     ).node;
// };

// export function minimax<T>(
//     maxDepth: number,
//     currentDepth: number,
//     node: TreeNode<T>,
//     isMax: boolean,
//     alpha: number,
//     beta: number
// ): TreeNode<T> | undefined {
//     if (maxDepth || node.terminateCondition()) {
//         node.getValue();
//     }

//     if (isMax) {
//         let values = node.getChildren().reduce((values, node) => {
//             let value = minimax(maxDepth, currentDepth + 1, node, false, alpha, beta);
//             if (typeof value !== "undefined") {
//                 values.push(value);
//             }
//             return values;
//         }, new Array() as Children<T>);

//         let maxnode = maxNode(values);

//         alpha = Math.max(alpha, maxnode.getValue());

//         if (beta <= alpha) {
//             return;
//         }

//         return maxnode;
//     } else {
//         let values = node.getChildren().reduce((values, node) => {
//             let value = minimax(maxDepth, currentDepth + 1, node, true, alpha, beta);
//             if (typeof value !== "undefined") {
//                 values.push(value);
//             }
//             return values;
//         }, new Array() as Children<T>);

//         let minnode = minNode(values);

//         beta = Math.min(beta, minnode.getValue());

//         // Alpha Beta Pruning
//         if (beta <= alpha) {
//             return;
//         }

//         return minnode;
//     }
// }

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// let node = new TreeNode<number>(0);

// node.addChild(new TreeNode<number>(1));
// node.addChild(new TreeNode<number>(2));
// node.addChild(new TreeNode<number>(3));

// node.getChildren().forEach(child => {
//     numbers.forEach(number => {
//         child.addChild(number.a)
//     })
// })
