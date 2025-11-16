import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Filter } from "lucide-react";

interface Applicant {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  city: string;
  primary_instrument: string;
  experience_level: string;
  heard_from?: string;
  note?: string;
  starter_pack_ack: boolean;
  circle_interest: boolean;
  status: string;
  crew_notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  const [crewNotes, setCrewNotes] = useState<string>("");

  useEffect(() => {
    checkAuth();
    fetchApplicants();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/");
    }
  };

  const fetchApplicants = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applicants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch applicants");
      console.error(error);
    } else {
      setApplicants(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (applicantId: string, newStatus: string) => {
    const { error } = await supabase
      .from('applicants')
      .update({ status: newStatus as any })
      .eq('id', applicantId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated successfully");
      fetchApplicants();
    }
  };

  const updateNotes = async (applicantId: string) => {
    const { error } = await supabase
      .from('applicants')
      .update({ crew_notes: crewNotes })
      .eq('id', applicantId);

    if (error) {
      toast.error("Failed to update notes");
    } else {
      toast.success("Notes updated successfully");
      setSelectedApplicant(null);
      setCrewNotes("");
      fetchApplicants();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500';
      case 'Reviewed': return 'bg-yellow-500';
      case 'Approved': return 'bg-green-500';
      case 'Added': return 'bg-purple-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredApplicants = filterStatus === "all" 
    ? applicants 
    : applicants.filter(a => a.status === filterStatus);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">OTS Tribe Admin</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 bg-card">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Added">Added to WhatsApp</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              Showing {filteredApplicants.length} of {applicants.length} applicants
            </span>
          </div>
        </Card>

        {/* Applicants List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="space-y-4">
            {filteredApplicants.map((applicant) => (
              <Card key={applicant.id} className="p-6 bg-card">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{applicant.full_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Applied {new Date(applicant.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Phone:</span> {applicant.phone_number}
                    </div>
                    <div>
                      <span className="font-semibold">City:</span> {applicant.city}
                    </div>
                    <div>
                      <span className="font-semibold">Instrument:</span> {applicant.primary_instrument}
                    </div>
                    <div>
                      <span className="font-semibold">Experience:</span> {applicant.experience_level}
                    </div>
                    {applicant.heard_from && (
                      <div>
                        <span className="font-semibold">Heard From:</span> {applicant.heard_from}
                      </div>
                    )}
                    <div>
                      <span className="font-semibold">Circle Interest:</span> {applicant.circle_interest ? 'Yes' : 'No'}
                    </div>
                  </div>

                  {applicant.note && (
                    <div className="p-3 bg-muted/50 rounded">
                      <span className="font-semibold text-sm">Note:</span>
                      <p className="text-sm mt-1">{applicant.note}</p>
                    </div>
                  )}

                  {(applicant.utm_source || applicant.utm_medium || applicant.utm_campaign) && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold">UTM:</span>{' '}
                      {applicant.utm_source && `Source: ${applicant.utm_source}`}
                      {applicant.utm_medium && ` | Medium: ${applicant.utm_medium}`}
                      {applicant.utm_campaign && ` | Campaign: ${applicant.utm_campaign}`}
                    </div>
                  )}

                  {applicant.crew_notes && (
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <span className="font-semibold text-sm">Crew Notes:</span>
                      <p className="text-sm mt-1">{applicant.crew_notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap pt-2">
                    <Select
                      value={applicant.status}
                      onValueChange={(value) => updateStatus(applicant.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Reviewed">Reviewed</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Added">Added to WhatsApp</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedApplicant(applicant.id);
                        setCrewNotes(applicant.crew_notes || "");
                      }}
                    >
                      {applicant.crew_notes ? "Edit Notes" : "Add Notes"}
                    </Button>
                  </div>

                  {selectedApplicant === applicant.id && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      <Textarea
                        value={crewNotes}
                        onChange={(e) => setCrewNotes(e.target.value)}
                        placeholder="Add crew notes..."
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => updateNotes(applicant.id)}>
                          Save Notes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedApplicant(null);
                            setCrewNotes("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;