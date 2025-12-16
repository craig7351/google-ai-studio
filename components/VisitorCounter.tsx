import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
    const [count, setCount] = useState<string>('載入中...');

    useEffect(() => {
        const API_URL = "https://counter-service.zeabur.app/api/visit";
        const PAGE_URL = "https://craig7351.github.io/google-ai-studio/";

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: PAGE_URL })
        })
            .then(response => response.json())
            .then(data => {
                setCount(data.count);
            })
            .catch(error => {
                console.error("Error fetching visitor count:", error);
                setCount("N/A");
            });
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-surface border border-studio-border text-xs text-studio-subtext font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>{count} 人氣</span>
        </div>
    );
};
