import { render, screen, waitFor, act } from '@testing-library/react'
import ProcessingStatus from '../../app/components/ProcessingStatus'

// Mock fetch globally
global.fetch = jest.fn()

describe('ProcessingStatus', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks()
        // Reset fetch mock
        global.fetch.mockReset()
    })

    it('renders loading state initially', () => {
        render(<ProcessingStatus />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders error state when API call fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'))
        
        await act(async () => {
            render(<ProcessingStatus />)
        })

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
                lastProcessed: '2025-03-21T11:40:51.000Z'
            }
        }

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockStatus)
        })

        await act(async () => {
            render(<ProcessingStatus />)
        })

        await waitFor(() => {
            // Use regex to match text content with optional whitespace
            expect(screen.getByText(/Status:\s*Processing/)).toBeInTheDocument()
            expect(screen.getByText(/Current File:\s*test.pdf/)).toBeInTheDocument()
            expect(screen.getByText(/Progress:\s*50%/)).toBeInTheDocument()
            expect(screen.getByText(/2\s*files in queue/)).toBeInTheDocument()
            expect(screen.getByText(/Last Processed:/)).toBeInTheDocument()
        })
    })

    it('updates status periodically', async () => {
        const mockStatus = {
            status: 'success',
            data: {
                isProcessing: true,
                currentFile: 'test.pdf',
                progress: 50,
                queue: 2,
                lastProcessed: '2025-03-21T11:40:52.000Z'
            }
        }

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockStatus)
        })

        await act(async () => {
            render(<ProcessingStatus />)
        })

        await waitFor(() => {
            expect(screen.getByText(/Status:\s*Processing/)).toBeInTheDocument()
        }, { timeout: 3000 })
    })
}) 