import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useDataVerification } from "@/hooks/useDataVerification";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const DataVerificationManager = () => {
  const { verifications, loading, error, updateVerification } = useDataVerification();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    value: "",
    is_verified: false,
    source_url: "",
    notes: "",
  });

  const handleEdit = (verification: any) => {
    setEditingItem(verification.id);
    setEditForm({
      value: verification.value,
      is_verified: verification.is_verified,
      source_url: verification.source_url || "",
      notes: verification.notes || "",
    });
  };

  const handleSave = async (verification: any) => {
    try {
      await updateVerification(verification.section, verification.data_key, editForm);
      setEditingItem(null);
      toast.success("Verification status updated");
    } catch (err) {
      toast.error("Failed to update verification");
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditForm({
      value: "",
      is_verified: false,
      source_url: "",
      notes: "",
    });
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="animate-pulse">Loading verification data...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8">
        <div className="text-center text-accent-danger">
          Error loading verifications: {error}
        </div>
      </Card>
    );
  }

  const groupedVerifications = verifications.reduce((acc, v) => {
    if (!acc[v.section]) {
      acc[v.section] = [];
    }
    acc[v.section].push(v);
    return acc;
  }, {} as Record<string, typeof verifications>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Verification Manager</h2>
          <p className="text-muted-foreground">
            Manage verification status for all statistical data across the report
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-success rounded-full"></div>
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Unverified</span>
          </div>
        </div>
      </div>

      {Object.entries(groupedVerifications).map(([section, items]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="capitalize">
              {section.replace("-", " ")} Section
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={item.is_verified ? "default" : "destructive"}
                      className={
                        item.is_verified
                          ? "bg-accent-success text-white"
                          : "bg-orange-500 text-white"
                      }
                    >
                      {item.is_verified ? "Verified" : "Unverified"}
                    </Badge>
                    <span className="font-medium">{item.data_key.replace("_", " ")}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  )}
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Verification: {item.data_key}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Data Value</label>
                        <Input
                          value={editForm.value}
                          onChange={(e) =>
                            setEditForm({ ...editForm, value: e.target.value })
                          }
                          placeholder="Data value..."
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="verified"
                          checked={editForm.is_verified}
                          onCheckedChange={(checked) =>
                            setEditForm({ ...editForm, is_verified: checked })
                          }
                        />
                        <label htmlFor="verified" className="text-sm font-medium">
                          Mark as verified
                        </label>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Source URL</label>
                        <Input
                          value={editForm.source_url}
                          onChange={(e) =>
                            setEditForm({ ...editForm, source_url: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          value={editForm.notes}
                          onChange={(e) =>
                            setEditForm({ ...editForm, notes: e.target.value })
                          }
                          placeholder="Verification notes..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleSave(item)}>
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};