using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chess
{
    class Pawn
    { 

        public const char PAWN_SYMBOL = 'X';
        public const char SPACE = ' ';
        public static char[,] pawns;
        public Pawn()
        {
            pawns = new char[ChessBoard.DIMENSION, ChessBoard.DIMENSION];
            initPawn();
        }
        private void initPawn()
        {
            for (int r = 0; r < ChessBoard.DIMENSION; r++)
            {
                for (int c = 0; c < ChessBoard.DIMENSION; c++)
                {
                    if (r == 0 || r == 1 || r == ChessBoard.DIMENSION - 2 || r == ChessBoard.DIMENSION - 1)
                        pawns[r, c] = PAWN_SYMBOL;
                    else
                        pawns[r, c] = SPACE;
                }
            }
        }
    }
}
