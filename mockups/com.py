"Computes the center of mass for an image alpha channel"

import numpy as np
from PIL import Image
import sys

def rymsum(arr, axis):
    return arr.sum(axis), np.arange(arr.shape[axis])

def main():
    for fname in sys.argv[1:]:
        pic = np.array(Image.open(fname))
        alpha = pic[..., -1]
        
        sx, rx = rymsum(alpha, 0)
        sy, ry = rymsum(alpha, 1)

        total = sx.sum()

        print fname, (rx*sx).sum() / total, (ry*sy).sum() / total
    
if __name__ == '__main__':
    main()