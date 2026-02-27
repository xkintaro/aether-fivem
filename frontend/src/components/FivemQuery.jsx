import { useEffect, useState, useRef } from 'react';

function getIdentifierType(id) {
    if (id.startsWith('steam:')) return 'steam';
    if (id.startsWith('discord:')) return 'discord';
    if (id.startsWith('license2:')) return 'license2';
    if (id.startsWith('license:')) return 'license';
    if (id.startsWith('xbl:')) return 'xbl';
    if (id.startsWith('live:')) return 'live';
    if (id.startsWith('fivem:')) return 'fivem';
    if (id.startsWith('ip:')) return 'ip';
    return 'other';
}

function getIdentifierBadge(type) {
    const map = {
        steam: { label: 'STEAM', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
        discord: { label: 'DISCORD', color: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' },
        license: { label: 'LICENSE', color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' },
        license2: { label: 'LICENSE2', color: 'bg-teal-600/20 text-teal-400 border-teal-500/30' },
        xbl: { label: 'XBL', color: 'bg-green-600/20 text-green-400 border-green-500/30' },
        live: { label: 'LIVE', color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' },
        fivem: { label: 'FIVEM', color: 'bg-orange-600/20 text-orange-400 border-orange-500/30' },
        ip: { label: 'IP', color: 'bg-rose-600/20 text-rose-400 border-rose-500/30' },
        other: { label: 'OTHER', color: 'bg-gray-600/20 text-gray-400 border-gray-500/30' },
    };
    return map[type] || map.other;
}

function getPingColor(ping) {
    if (ping <= 50) return 'text-glitch-lime';
    if (ping <= 100) return 'text-glitch-amber';
    return 'text-glitch-red';
}

function GridBG() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
            style={{
                backgroundImage: `
          linear-gradient(var(--color-glitch-cyan) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-glitch-cyan) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px',
            }}
        />
    );
}

function StatCard({ label, value, icon, accentColor = 'text-glitch-cyan' }) {
    return (
        <div className="bg-glitch-card/60 backdrop-blur-sm border border-glitch-border rounded-lg p-4 flex items-center gap-4 hover:border-glitch-border-hover transition-all duration-300 group">
            <div className={`text-2xl ${accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                {icon}
            </div>
            <div>
                <div className={`font-display text-xl font-bold ${accentColor}`}>{value}</div>
                <div className="text-glitch-text-dim text-xs font-body uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
}

function PlayerModal({ player, onClose }) {
    if (!player) return null;

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-glitch-surface border border-glitch-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'float-up 0.25s ease-out' }}
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-glitch-cyan/60 to-transparent" />

                <div className="flex items-center justify-between p-5 border-b border-glitch-border">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-full bg-linear-to-br from-glitch-cyan/20 to-glitch-magenta/20 border border-glitch-border flex items-center justify-center shrink-0">
                            <span className="font-display text-sm font-bold text-glitch-cyan">{player.id}</span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-body text-lg font-semibold text-glitch-text truncate">{player.name}</h3>
                            <div className="flex items-center gap-3 mt-0.5">
                                <span className="font-mono text-xs text-glitch-text-dim">ID #{player.id}</span>
                                <span className={`font-mono text-xs ${getPingColor(player.ping)}`}>{player.ping}ms</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-glitch-card border border-glitch-border flex items-center justify-center text-glitch-text-dim hover:text-glitch-red hover:border-glitch-red/40 transition-colors cursor-pointer"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    {player.endpoint && (
                        <div>
                            <span className="text-glitch-text-dim text-[10px] font-display tracking-widest uppercase block mb-1">Endpoint</span>
                            <div className="bg-glitch-card border border-glitch-border rounded-lg px-3 py-2">
                                <span className="text-glitch-text text-sm font-mono">{player.endpoint}</span>
                            </div>
                        </div>
                    )}

                    <div>
                        <span className="text-glitch-text-dim text-[10px] font-display tracking-widest uppercase block mb-1">Ping</span>
                        <div className="bg-glitch-card border border-glitch-border rounded-lg px-3 py-2 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${player.ping <= 50 ? 'bg-glitch-lime' : player.ping <= 100 ? 'bg-glitch-amber' : 'bg-glitch-red'}`} />
                            <span className={`text-sm font-mono ${getPingColor(player.ping)}`}>{player.ping}ms</span>
                        </div>
                    </div>

                    <div>
                        <span className="text-glitch-text-dim text-[10px] font-display tracking-widest uppercase block mb-2">Identifiers</span>
                        <div className="space-y-1.5">
                            {player.identifiers.map((id, i) => {
                                const type = getIdentifierType(id);
                                const badge = getIdentifierBadge(type);
                                const value = id.includes(':') ? id.split(':').slice(1).join(':') : id;
                                return (
                                    <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-mono ${badge.color}`}>
                                        <span className="font-display text-[10px] font-bold opacity-80 shrink-0 w-16">{badge.label}</span>
                                        <span className="opacity-20">|</span>
                                        <span className="break-all">{value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlayerRow({ player, onClick, index }) {
    return (
        <div
            className="bg-glitch-card/50 backdrop-blur-sm border border-glitch-border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-glitch-cyan/30 transition-all duration-300 group"
            onClick={() => onClick(player)}
            style={{ animation: `float-up 0.4s ease-out ${index * 0.02}s both` }}
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-glitch-cyan/20 to-glitch-magenta/20 border border-glitch-border flex items-center justify-center shrink-0 group-hover:border-glitch-cyan/40 transition-colors">
                    <span className="font-display text-xs font-bold text-glitch-cyan">{player.id}</span>
                </div>
                <div className="min-w-0">
                    <h3 className="font-body text-sm font-semibold text-glitch-text truncate group-hover:text-glitch-cyan transition-colors">
                        {player.name}
                    </h3>
                    <span className="font-mono text-[11px] text-glitch-text-dim">ID #{player.id}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <span className={`font-mono text-xs ${getPingColor(player.ping)}`}>{player.ping}ms</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-glitch-text-muted group-hover:text-glitch-cyan transition-colors">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}

export default function FivemQuery() {
    const [players, setPlayers] = useState([]);
    const [serverUrl, setServerUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [queried, setQueried] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const [searchName, setSearchName] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchSteam, setSearchSteam] = useState('');
    const [searchDiscord, setSearchDiscord] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/players', { method: 'DELETE' }).catch(() => { });
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!serverUrl.trim()) {
            setError('Please enter a valid server URL.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serverUrl }),
            });
            const data = await res.json();
            if (res.ok) {
                setPlayers(data.data);
                setQueried(true);
                resetFilters();
            } else {
                setError(data.error || 'Failed to query server.');
            }
        } catch {
            setError('Could not connect to backend.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewQuery = async () => {
        try {
            await fetch('http://localhost:5000/players', { method: 'DELETE' });
        } catch {
        }
        setPlayers([]);
        setQueried(false);
        setError('');
        setServerUrl('');
        resetFilters();
        setSelectedPlayer(null);
    };

    const resetFilters = () => {
        setSearchName('');
        setSearchId('');
        setSearchSteam('');
        setSearchDiscord('');
    };

    const filteredPlayers = players.filter((player) => {
        const nameMatch = player.name.toLowerCase().includes(searchName.toLowerCase());
        const idMatch = searchId === '' || player.id.toString().includes(searchId);
        const steamMatch =
            searchSteam === '' ||
            player.identifiers.some((id) =>
                id.toLowerCase().includes(`steam:${searchSteam.toLowerCase()}`)
            );
        const discordMatch =
            searchDiscord === '' ||
            player.identifiers.some((id) =>
                id.toLowerCase().includes(`discord:${searchDiscord.toLowerCase()}`)
            );
        return nameMatch && idMatch && steamMatch && discordMatch;
    });

    const avgPing = players.length
        ? Math.round(players.reduce((sum, p) => sum + p.ping, 0) / players.length)
        : 0;
    return (
        <div className="min-h-screen bg-glitch-bg text-glitch-text font-body relative overflow-x-hidden">
            <GridBG />
            {!queried && (
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                    <div className="mb-10 text-center" style={{ animation: 'float-up 0.6s ease-out' }}>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                                <img src="/logo.png" alt="Logo" className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-contain" />
                            </div>
                        </div>
                        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider mb-2">
                            <span className="text-glitch-cyan">AETHER</span>
                            <span className="text-glitch-text mx-2">FIVEM</span>
                        </h1>
                        <div className="text-xs font-mono text-glitch-text-dim tracking-[0.3em] uppercase">
                            FiveM Server Query Tool
                        </div>
                    </div>
                    <div className="w-full max-w-2xl" style={{ animation: 'float-up 0.6s ease-out 0.15s both' }}>
                        <form onSubmit={handleSubmit} className="relative group" id="query-form">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-glitch-cyan/20 via-glitch-magenta/10 to-glitch-cyan/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-glitch-surface border border-glitch-border rounded-xl p-1.5 flex items-center gap-1.5">
                                <div className="hidden sm:flex items-center px-3 py-2.5 bg-glitch-card rounded-lg border border-glitch-border">
                                    <span className="font-mono text-xs text-glitch-cyan-dim tracking-wide">URL</span>
                                </div>
                                <input
                                    ref={inputRef}
                                    id="server-url-input"
                                    type="text"
                                    placeholder="http://ip:port/players.json"
                                    value={serverUrl}
                                    onChange={(e) => setServerUrl(e.target.value)}
                                    className="flex-1 bg-transparent px-4 py-2.5 text-sm font-mono text-glitch-text placeholder:text-glitch-text-muted focus:outline-none"
                                />
                                <button
                                    id="query-submit-btn"
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-linear-to-r from-glitch-cyan to-glitch-cyan-dim text-glitch-bg font-display text-xs font-bold tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed uppercase cursor-pointer"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25" />
                                                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            Querying
                                        </span>
                                    ) : (
                                        'Query'
                                    )}
                                </button>
                            </div>
                        </form>
                        {error && (
                            <div className="mt-3 px-4 py-2.5 bg-glitch-red/10 border border-glitch-red/30 rounded-lg flex items-center gap-2" style={{ animation: 'float-up 0.3s ease-out' }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-glitch-red shrink-0">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 5V9M8 11V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-glitch-red text-sm font-body">{error}</span>
                            </div>
                        )}
                        <div className="mt-8 text-center" style={{ animation: 'float-up 0.6s ease-out 0.3s both' }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-glitch-card/40 border border-glitch-border rounded-full">
                                <div className="w-2 h-2 rounded-full bg-glitch-cyan animate-pulse" />
                                <span className="text-xs font-mono text-glitch-text-dim tracking-wide">
                                    Enter a FiveM server URL to begin querying players
                                </span>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-center gap-3" style={{ animation: 'float-up 0.6s ease-out 0.45s both' }}>
                            <a
                                href="https://github.com/xkintaro/aether-fivem"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-glitch-card/60 border border-glitch-border rounded-lg hover:border-glitch-text/30 hover:bg-glitch-card transition-all duration-300 group"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-glitch-text-dim group-hover:text-glitch-text transition-colors">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span className="font-display text-[11px] font-bold text-glitch-text-dim tracking-wider uppercase group-hover:text-glitch-text transition-colors">GitHub</span>
                            </a>
                            <a
                                href="https://discord.gg/NSQk27Zdkv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-glitch-card/60 border border-glitch-border rounded-lg hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 group"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-glitch-text-dim group-hover:text-indigo-400 transition-colors">
                                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                <span className="font-display text-[11px] font-bold text-glitch-text-dim tracking-wider uppercase group-hover:text-indigo-400 transition-colors">Discord</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {queried && (
                <div className="relative z-10 min-h-screen">
                    <header className="sticky top-0 z-30 bg-glitch-bg/80 backdrop-blur-md border-b border-glitch-border px-4 py-3">
                        <div className="max-w-6xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                                <h1 className="font-display text-sm font-bold tracking-wider">
                                    <span className="text-glitch-cyan">AETHER</span>
                                    <span className="text-glitch-text ml-1">FIVEM</span>
                                </h1>
                            </div>
                            <button
                                id="new-query-btn"
                                onClick={handleNewQuery}
                                className="flex items-center gap-2 px-4 py-2 bg-glitch-card border border-glitch-border rounded-lg hover:border-glitch-cyan/40 transition-colors cursor-pointer group"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-glitch-text-dim group-hover:text-glitch-cyan transition-colors">
                                    <path d="M1 7C1 3.68629 3.68629 1 7 1C9.07107 1 10.9019 2.04421 12 3.63604" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M13 7C13 10.3137 10.3137 13 7 13C4.92893 13 3.09812 11.9558 2 10.364" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M10 1L12 3.5L14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-display text-[11px] font-bold text-glitch-text-dim tracking-wider uppercase group-hover:text-glitch-cyan transition-colors">New Query</span>
                            </button>
                        </div>
                    </header>

                    <section className="px-4 py-6 max-w-6xl mx-auto" style={{ animation: 'float-up 0.5s ease-out' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            <StatCard
                                label="Total Players"
                                value={players.length}
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21V19C22.9986 17.177 21.765 15.5857 20 15.13" />
                                        <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" />
                                    </svg>
                                }
                                accentColor="text-glitch-cyan"
                            />
                            <StatCard
                                label="Filtered"
                                value={filteredPlayers.length}
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" strokeLinejoin="round" />
                                    </svg>
                                }
                                accentColor="text-glitch-magenta"
                            />
                            <StatCard
                                label="Avg Ping"
                                value={`${avgPing}ms`}
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 12H18L15 21L9 3L6 12H2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                                accentColor="text-glitch-lime"
                            />
                            <StatCard
                                label="Server"
                                value="Online"
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="3" width="20" height="14" rx="2" />
                                        <path d="M8 21H16M12 17V21" />
                                    </svg>
                                }
                                accentColor="text-glitch-amber"
                            />
                        </div>
                        <div className="bg-glitch-surface/60 backdrop-blur-sm border border-glitch-border rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-glitch-cyan-dim">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21L16.65 16.65" />
                                    </svg>
                                    <span className="font-display text-xs font-bold text-glitch-text-dim tracking-widest uppercase">Filters</span>
                                </div>
                                {(searchName || searchId || searchSteam || searchDiscord) && (
                                    <button
                                        id="clear-filters-btn"
                                        onClick={resetFilters}
                                        className="text-xs font-mono text-glitch-red hover:text-glitch-red/80 transition-colors cursor-pointer"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <FilterInput id="filter-name" label="Player Name" placeholder="Search name..." value={searchName} onChange={setSearchName} />
                                <FilterInput id="filter-id" label="Player ID" placeholder="Search ID..." value={searchId} onChange={setSearchId} />
                                <FilterInput id="filter-steam" label="Steam ID" placeholder="Search Steam..." value={searchSteam} onChange={setSearchSteam} />
                                <FilterInput id="filter-discord" label="Discord ID" placeholder="Search Discord..." value={searchDiscord} onChange={setSearchDiscord} />
                            </div>
                        </div>
                        {filteredPlayers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                                {filteredPlayers.map((player, i) => (
                                    <PlayerRow key={player.id} player={player} index={i} onClick={setSelectedPlayer} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-glitch-card border border-glitch-border flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-glitch-text-muted">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21L16.65 16.65" />
                                        <path d="M8 11H14" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="font-display text-sm text-glitch-text-dim tracking-wider mb-1">NO RESULTS FOUND</h3>
                                <p className="text-xs font-mono text-glitch-text-muted">Try adjusting your filter criteria</p>
                            </div>
                        )}
                    </section>
                </div>
            )}
            <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
        </div>
    );
}

function FilterInput({ id, label, placeholder, value, onChange }) {
    return (
        <div>
            <label htmlFor={id} className="block text-[10px] font-display text-glitch-text-dim tracking-widest uppercase mb-1.5">
                {label}
            </label>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-glitch-card border border-glitch-border rounded-lg px-3 py-2 text-sm font-mono text-glitch-text placeholder:text-glitch-text-muted focus:outline-none focus:border-glitch-cyan/40 transition-colors"
            />
        </div>
    );
}
