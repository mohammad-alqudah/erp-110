import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Building } from 'lucide-react';
import { getBranches } from '../services/api/branchApi';
import Logo from './ui/Logo';
import toast from 'react-hot-toast';

export default function BranchSelectionScreen() {
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const { data: branchesResponse, isLoading, error } = useQuery('branches', getBranches);

  const handleBranchSelect = () => {
    if (!selectedBranchId) {
      toast.error('Please select a branch');
      return;
    }

    // Store the selected branch in user data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const selectedBranch = branchesResponse?.data.find(b => b.id === selectedBranchId);
    
    if (selectedBranch) {
      user.branches = [{ id: selectedBranch.id, name: selectedBranch.name }];
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/products');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading branches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load branches. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Select Branch
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose a branch to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Available Branches
              </label>
              <div className="mt-4 space-y-2">
                {branchesResponse?.data.map((branch) => (
                  <label
                    key={branch.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedBranchId === branch.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="branch"
                      value={branch.id}
                      checked={selectedBranchId === branch.id}
                      onChange={() => setSelectedBranchId(branch.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <div className="ml-3 flex items-center">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {branch.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleBranchSelect}
              disabled={!selectedBranchId}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}