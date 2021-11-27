using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chess
{
    class Move : Pawn
    {
        private int targetX;
        private int targetY;
        private int destinationX;
        private int destinationY;

        public  Move()
        {
            targetX = 0;
            targetY = 0;
            destinationX = 0;
            destinationY = 0;
            Exit = false;
        }
        public bool Exit { get; set; }

        public void MakeMove()
        {
            getInput();

           
            rearangePawns();


        }
        private void getInput()
        {
            Console.WriteLine("Enter Target's X axis:");
            Exit = validateInput(int.TryParse(Console.ReadLine(), out targetX));

            if (!Exit)
            {
                Console.WriteLine("Enter Target's Y axis:");
                Exit = validateInput(int.TryParse(Console.ReadLine(), out targetY));
            }
            if (!Exit)
            {
                Console.WriteLine("Enter Destination's X axis:");
                Exit = validateInput(int.TryParse(Console.ReadLine(), out destinationX));
            }
            if (!Exit)
            {
                Console.WriteLine("Enter Destination's Y axis:");
                Exit = validateInput(int.TryParse(Console.ReadLine(), out destinationY));
            }

        }
        private void rearangePawns()
        {
            pawns[destinationX, destinationY] = pawns[targetX, targetY];
            pawns[targetX, targetY] = SPACE;


        }
        private bool validateInput(bool parsed)
        {
            bool error = false;
            if (!parsed)
                error = true;
            else if (targetX < 0 || targetY < 0 || destinationX < 0 || destinationY < 0)
                error = true;
            else if (targetX > ChessBoard.DIMENSION - 1 || targetY > ChessBoard.DIMENSION - 1 || destinationX > ChessBoard.DIMENSION - 1 || destinationY > ChessBoard.DIMENSION - 1)
                error = true;

            if (error)
                Console.WriteLine("Invalid input, EXIT!");
            return error;
        }
      
    }
}


