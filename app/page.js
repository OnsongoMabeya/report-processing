import ProcessingStatus from './components/ProcessingStatus';

export default function Home() {
    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-navy">Dashboard</h2>
            <button className="btn-primary">
            Process New Reports
            </button>
        </div>

        <ProcessingStatus />
        </div>
    );
} 