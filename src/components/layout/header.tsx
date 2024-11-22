import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-blue-600">EDUINSIGHT</span>
                        </Link>
                    </div>


                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;