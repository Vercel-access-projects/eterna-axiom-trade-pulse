'use client';

export interface PriceUpdate {
    tokenId: string;
    price: string;
    marketCap: string;
    volume: string;
    change1h: number;
    change6h: number;
    change24h: number;
    holders: number;
    timestamp: number;
}

type PriceUpdateCallback = (update: PriceUpdate) => void;

class WebSocketMockService {
    private subscribers: Map<string, Set<PriceUpdateCallback>> = new Map();
    private intervals: Map<string, NodeJS.Timeout> = new Map();
    private isRunning = false;

    // Subscribe to price updates for a specific token
    subscribe(tokenId: string, callback: PriceUpdateCallback) {
        console.log(`[WS Service] New subscription for token: ${tokenId}`);
        
        if (!this.subscribers.has(tokenId)) {
            this.subscribers.set(tokenId, new Set());
        }
        this.subscribers.get(tokenId)?.add(callback);

        // Start updates if not already running
        if (!this.isRunning) {
            this.isRunning = true;
            console.log('[WS Service] Service started');
        }

        // Start interval for this specific token if not already running
        if (!this.intervals.has(tokenId)) {
            console.log(`[WS Service] Starting interval for token: ${tokenId}`);
            
            const interval = setInterval(() => {
                const update = this.generatePriceUpdate(tokenId);
                const callbacks = this.subscribers.get(tokenId);
                console.log(`[WS Service] Generated update for ${tokenId}:`, update);
                if (callbacks) {
                    console.log(`[WS Service] Notifying ${callbacks.size} subscribers for ${tokenId}`);
                    callbacks.forEach(callback => callback(update));
                }
            }, Math.random() * 2000 + 1000); // Random between 1-3 seconds

            this.intervals.set(tokenId, interval);
        } else {
            console.log(`[WS Service] Interval already exists for token: ${tokenId}`);
        }

        // Return unsubscribe function
        return () => {
            console.log(`[WS Service] Unsubscribing from token: ${tokenId}`);
            this.subscribers.get(tokenId)?.delete(callback);
            if (this.subscribers.get(tokenId)?.size === 0) {
                this.subscribers.delete(tokenId);
                const interval = this.intervals.get(tokenId);
                if (interval) {
                    clearInterval(interval);
                    this.intervals.delete(tokenId);
                    console.log(`[WS Service] Cleared interval for token: ${tokenId}`);
                }
            }
        };
    }

    private baseValues: Map<string, any> = new Map();

    private generatePriceUpdate(tokenId: string): PriceUpdate {
        // Get or initialize base values for this token
        if (!this.baseValues.has(tokenId)) {
            this.baseValues.set(tokenId, {
                price: Math.random() * 0.001 + 0.0001,
                marketCap: Math.random() * 500000 + 50000,
                volume: Math.random() * 50000 + 5000,
                holders: Math.floor(Math.random() * 500) + 50,
            });
        }

        const base = this.baseValues.get(tokenId);
        
        // Generate realistic price movements (smaller changes for more realistic effect)
        const priceChange = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
        const priceMultiplier = 1 + priceChange / 100;
        
        // Update base values gradually
        base.price *= priceMultiplier;
        base.marketCap *= priceMultiplier;
        base.volume *= (1 + (Math.random() - 0.5) * 10 / 100); // More volatile volume
        
        // Occasionally change holders
        if (Math.random() > 0.7) {
            base.holders += Math.floor(Math.random() * 5) - 2; // -2 to +3
            base.holders = Math.max(1, base.holders); // At least 1 holder
        }

        return {
            tokenId,
            price: base.price.toFixed(6),
            marketCap: this.formatNumber(base.marketCap),
            volume: this.formatNumber(base.volume),
            change1h: Number((Math.random() * 20 - 10).toFixed(2)), // -10% to +10%
            change6h: Number((Math.random() * 40 - 20).toFixed(2)), // -20% to +20%
            change24h: Number((Math.random() * 60 - 30).toFixed(2)), // -30% to +30%
            holders: base.holders,
            timestamp: Date.now(),
        };
    }

    private formatNumber(num: number): string {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(2)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(2)}K`;
        }
        return num.toFixed(2);
    }

    // Stop all updates
    stop() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals.clear();
        this.isRunning = false;
    }

    // Subscribe to all tokens at once
    subscribeAll(callback: (updates: PriceUpdate[]) => void) {
        const interval = setInterval(() => {
            const updates: PriceUpdate[] = [];
            this.subscribers.forEach((_, tokenId) => {
                updates.push(this.generatePriceUpdate(tokenId));
            });
            if (updates.length > 0) {
                callback(updates);
            }
        }, 3000); // Update all every 3 seconds

        return () => clearInterval(interval);
    }
}

// Singleton instance
export const wsService = new WebSocketMockService();
