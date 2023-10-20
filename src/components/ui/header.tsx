"use client"

import { HomeIcon, ListOrderedIcon, LogInIcon, MenuIcon, PercentCircleIcon, PercentIcon, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";

const Header = () => {

    const {status, data} = useSession()

    const handleLoginClick = async () => {
        await signIn();
    }; 

    const handleLogoutClick = async () => {
        await signOut();
    };

    return ( 
        <Card className="flex justify-between items-center p-[1.875rem]">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader className="text-left text-lg font-semibold">
                        Menu
                    </SheetHeader>

                    {status === 'authenticated' && data?.user && (
                        <div className="flex flex-col">
                            <div className="py-4 flex items-center gap-2">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.user.name?.[0].toUpperCase()}
                                    </AvatarFallback>

                                    {data.user.image && (
                                        <AvatarImage src={data.user.image} />
                                    )}
                                </Avatar>
                                
                                <div className="flex flex-col">
                                    <p className="font-medium">{data.user.name}</p>
                                    <p className="text-sm opacity-75">Boas compras!</p>
                                </div>
                            </div>

                            <Separator />
                        </div>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                        {status === "unauthenticated" && (
                            <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2">
                                <LogInIcon size={16} />
                                Fazer login
                            </Button>
                        )}

                        {status === "authenticated" && (
                            <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2">
                                <LogInIcon size={16} />
                                Fazer logout
                            </Button>
                        )}

                        <Button variant="outline" className="w-full justify-start gap-2">
                            <HomeIcon size={16} />
                            Início
                        </Button>

                        <Button variant="outline" className="w-full justify-start gap-2">
                            <PercentIcon size={16} />
                            Ofertas
                        </Button>
                        
                        <SheetClose asChild>
                            <Link href='/catalog'>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <ListOrderedIcon size={16} />
                                    Catálogo
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>

            <Link href={'/'}>
                <h1 className="font-semibold text-lg">
                    <span className="text-primary">FSW</span> Store
                </h1>
            </Link>

            <Button size="icon" variant="outline">
                <ShoppingCart />
            </Button>
        </Card>
     );
}
 
export default Header;