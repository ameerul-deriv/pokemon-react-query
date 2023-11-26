import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import pokeballLogo from '../assets/pokeball.svg';

const Navbar = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className='mr-5 cursor-pointer'>
                    <NavigationMenuLink>
                        <Link to='/'>
                            <Avatar>
                                <AvatarImage src={pokeballLogo} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Link to='/pagination'>
                            <span className='text-lg font-medium'>Pagination</span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Link to='/infinite'>
                            <span className='text-lg font-medium'>Infinite Queries</span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
