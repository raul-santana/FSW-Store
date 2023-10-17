import { MenuIcon, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

const Header = () => {
    return ( 
        <Card className="flex justify-between items-center p-[1.875rem]">
            <Button size="icon" variant="outline">
                <MenuIcon />
            </Button>

            <h1 className="font-semibold text-lg text-primary">FSW Store</h1>

            <Button size="icon" variant="outline">
                <ShoppingCart />
            </Button>
        </Card>
     );
}
 
export default Header;