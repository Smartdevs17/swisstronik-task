// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SimpleTokenSwap {
    using SafeERC20 for IERC20;

    ISwapRouter public immutable swapRouter;
    address public immutable WETH;

    // Define the constructor
    constructor(address _swapRouter, address _WETH) {
        swapRouter = ISwapRouter(_swapRouter);
        WETH = _WETH;
    }

    // Create a swap function that takes input and output token addresses,
    // the input amount, the minimum output amount, and the recipient's address
    function swap(
        address inputToken,
        address outputToken,
        uint256 inputAmount,
        uint256 minOutputAmount,
        address recipient
    ) external {
        // Transfer the input tokens from the sender to the contract
        IERC20(inputToken).safeTransferFrom(msg.sender, address(this), inputAmount);

        // Approve the Uniswap router to spend the input tokens
        IERC20(inputToken).approve(address(swapRouter), inputAmount);

        // Define the exact input swapping path to swap maximum amount of receiving token
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: inputToken,
            tokenOut: outputToken,
            fee: 3000,
            recipient: recipient,
            deadline: block.timestamp + 15,
            amountIn: inputAmount,
            amountOutMinimum: minOutputAmount,
            sqrtPriceLimitX96: 0
        });

        // Call the Uniswap router's exactInputSingle function to execute the swap
        swapRouter.exactInputSingle(params);
    }
}
