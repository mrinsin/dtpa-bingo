#!/bin/bash

# Bingo Caller Script
# Generates random bingo cell locations (A1-E5)

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arrays for rows and columns
ROWS=('A' 'B' 'C' 'D' 'E')
COLS=('1' '2' '3' '4' '5')

# Array to store called cells
CALLED_CELLS=()

# Function to generate a random cell
generate_cell() {
    local row_index=$((RANDOM % 5))
    local col_index=$((RANDOM % 5))
    echo "${ROWS[$row_index]}${COLS[$col_index]}"
}

# Function to check if cell was already called
is_called() {
    local cell=$1
    for called in "${CALLED_CELLS[@]}"; do
        if [[ "$called" == "$cell" ]]; then
            return 0
        fi
    done
    return 1
}

# Function to display called cells
display_called_cells() {
    if [ ${#CALLED_CELLS[@]} -eq 0 ]; then
        echo -e "${YELLOW}No cells called yet.${NC}"
    else
        echo -e "${BLUE}═══════════════════════════════${NC}"
        echo -e "${BLUE}Previously Called Cells:${NC}"
        echo -e "${BLUE}═══════════════════════════════${NC}"
        for cell in "${CALLED_CELLS[@]}"; do
            echo -e "  ${GREEN}✓${NC} $cell"
        done
        echo -e "${BLUE}═══════════════════════════════${NC}"
        echo -e "Total cells called: ${GREEN}${#CALLED_CELLS[@]}${NC} / 25"
    fi
}

# Clear screen and show header
clear
echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
echo -e "${YELLOW}║    DTPA BINGO CALLER v1.0      ║${NC}"
echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
echo ""

# Main loop
while true; do
    # Check if all cells have been called
    if [ ${#CALLED_CELLS[@]} -eq 25 ]; then
        echo -e "${GREEN}🎉 All 25 cells have been called! Game complete! 🎉${NC}"
        echo ""
        display_called_cells
        echo ""
        read -p "Press Enter to start a new game or Ctrl+C to exit..."
        CALLED_CELLS=()
        clear
        echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
        echo -e "${YELLOW}║    DTPA BINGO CALLER v1.0      ║${NC}"
        echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
        echo ""
        continue
    fi

    # Display previously called cells
    if [ ${#CALLED_CELLS[@]} -gt 0 ]; then
        echo ""
        display_called_cells
        echo ""
    fi

    # Prompt user
    echo -e "${YELLOW}Press Enter to call the next bingo cell...${NC}"
    read -r

    # Generate a unique cell
    while true; do
        NEW_CELL=$(generate_cell)
        if ! is_called "$NEW_CELL"; then
            break
        fi
    done

    # Add to called cells
    CALLED_CELLS+=("$NEW_CELL")

    # Clear and display
    clear
    echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║    DTPA BINGO CALLER v1.0      ║${NC}"
    echo -e "${YELLOW}╔════════════════════════════════╗${NC}"
    echo ""
    echo -e "${GREEN}╔════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                ║${NC}"
    echo -e "${GREEN}║         CELL CALLED:           ║${NC}"
    echo -e "${GREEN}║                                ║${NC}"
    echo -e "${GREEN}║            ${NEW_CELL}                ║${NC}"
    echo -e "${GREEN}║                                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════╝${NC}"
done
