import { render, screen, waitFor, act } from '@testing-library/react'
import ProcessingStatus from '@/components/ProcessingStatus'

describe('ProcessingStatus', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders loading state initially', () => {
        render(<ProcessingStatus />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders error state when API call fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'))
        
        render(<ProcessingStatus />)
        
        await waitFor(() => {
            expect(screen.getByText('Error fetching status')).toBeInTheDocument()
        })
    })

    it('renders processing status when API call succeeds', async () => {
        const mockStatus = {
            status: 'success',
            data: {
                isProcessing: true,
                currentFile: 'test.pdf',
                progress: 50,
                queue: 2,
                lastProcessed: new Date().toISOString(),
            }
        }

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockStatus),
        })

        render(<ProcessingStatus />)

        await waitFor(() => {
            expect(screen.getByText('Processing')).toBeInTheDocument()
            expect(screen.getByText('test.pdf')).toBeInTheDocument()
            expect(screen.getByText('50%')).toBeInTheDocument()
            expect(screen.getByText('2 files in queue')).toBeInTheDocument()
        })
    })

    it('updates status periodically', async () => {
        jest.useFakeTimers()

        const mockStatus = {
            status: 'success',
            data: {
                isProcessing: true,
                currentFile: 'test.pdf',
                progress: 50,
                queue: 2,
                lastProcessed: new Date().toISOString(),
            }
        }

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockStatus),
        })

        render(<ProcessingStatus />)

        await waitFor(() => {
            expect(screen.getByText('Processing')).toBeInTheDocument()
        })

        // Fast forward 5 seconds
        await act(async () => {
            jest.advanceTimersByTime(5000)
        })

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2)
        })

        jest.useRealTimers()
    })
}) 