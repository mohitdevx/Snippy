// components/FoldersPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api/axios.api';
import { PopUp } from '../components/PopupMessage';
import { ConfirmationModal } from '../components/ConfirmationModel';

export const FoldersPage = () => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, folder: null });
    const navigate = useNavigate();

    const [popupState, setPopupState] = useState({
        message: '',
        type: 'success',
        trigger: 0
    });

    const showPopup = (message, type = 'success') => {
        setPopupState((prev) => ({
            message,
            type,
            trigger: prev.trigger + 1
        }));
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        try {
            const response = await Api.get('/folders');
            if (response.data.success) {
                setFolders(response.data.data.folders);
            }
        } catch (error) {
            console.error('Error fetching folders:', error);
            showPopup('Failed to load folders', 'error');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleFolderClick = (folder) => {
        navigate(`/snippets`, { state: { folder } });
    };

    const handleDeleteClick = (folder, e) => {
        e.stopPropagation();
        setDeleteModal({ isOpen: true, folder });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.folder) return;

        try {
            const response = await Api.delete(`/folders/${deleteModal.folder._id}`);
            if (response.data.success) {
                showPopup('Folder deleted successfully', 'success');
                setFolders(prev => prev.filter(f => f._id !== deleteModal.folder._id));
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
            const errorMsg = error?.response?.data?.message || 'Failed to delete folder';
            showPopup(errorMsg, 'error');
        } finally {
            setDeleteModal({ isOpen: false, folder: null });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, folder: null });
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/20">
                        <i className="ri-folder-3-line text-white text-2xl"></i>
                    </div>
                    <p className="text-gray-400 text-lg">Loading your folders...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <PopUp
                message={popupState.message}
                type={popupState.type}
                trigger={popupState.trigger}
                duration={4000}
            />

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Folder"
                message={`Are you sure you want to delete the folder "${deleteModal.folder?.name}"? ${
                    deleteModal.folder?.snippets?.length > 0 
                    ? `This will also delete ${deleteModal.folder.snippets.length} snippet${deleteModal.folder.snippets.length === 1 ? '' : 's'} inside.` 
                    : ''
                }`}
                confirmText="Delete Folder"
                cancelText="Cancel"
                type="danger"
            />

            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-blue-400/30">
                                    <i className="ri-folder-3-line text-white text-2xl"></i>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-sm"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-2">
                                    Code Folders
                                </h1>
                                <p className="text-gray-400/80 text-lg font-light">
                                    Organized collection of your code snippets
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-400 mb-1">Total Collections</div>
                            <div className="text-2xl font-bold text-white">{folders.length}</div>
                        </div>
                    </div>

                    {/* Folders Grid */}
                    {folders.length === 0 ? (
                        <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 p-16 text-center">
                            <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                                <i className="ri-folder-line text-4xl text-gray-400"></i>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">No folders created yet</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                                Start organizing your code by creating snippets with folder names.
                            </p>
                            <button
                                onClick={() => navigate('/create')}
                                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl hover:from-blue-400 hover:to-cyan-300 transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                            >
                                <i className="ri-add-line text-lg"></i>
                                <span className="font-semibold">Create First Snippet</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {folders.map((folder) => (
                                <div
                                    key={folder._id}
                                    className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105 group"
                                >
                                    {/* Folder Header */}
                                    <div className="p-6 border-b border-white/10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border transition-all duration-300 ${folder.snippets.length > 0
                                                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                                                    : 'bg-white/5 border-white/10'
                                                    }`}>
                                                    <i className={`ri-folder-3-line text-xl ${folder.snippets.length > 0 ? 'text-blue-400' : 'text-gray-400'
                                                        }`}></i>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors duration-300">
                                                        {folder.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                                                        <span className="flex items-center space-x-1">
                                                            <i className="ri-file-code-line"></i>
                                                            <span>{folder.snippets.length} {folder.snippets.length === 1 ? 'snippet' : 'snippets'}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <button
                                                    onClick={() => handleFolderClick(folder)}
                                                    className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 transition-all duration-300 flex items-center justify-center hover:scale-110"
                                                    title="Open folder"
                                                >
                                                    <i className="ri-arrow-right-up-line text-sm"></i>
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteClick(folder, e)}
                                                    className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 transition-all duration-300 flex items-center justify-center hover:scale-110"
                                                    title="Delete folder"
                                                >
                                                    <i className="ri-delete-bin-line text-sm"></i>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                Created {formatDate(folder.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Folder Footer */}
                                    <div className="p-4 border-t border-white/10 bg-gradient-to-r from-white/2 to-transparent">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500">
                                                Last updated {formatDate(folder.updatedAt)}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${folder.snippets.length > 0 ? 'bg-green-400' : 'bg-gray-400'
                                                    }`}></div>
                                                <span className="text-gray-400">
                                                    {folder.snippets.length > 0 ? 'Active' : 'Empty'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};