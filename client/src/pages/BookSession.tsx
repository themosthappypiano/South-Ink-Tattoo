import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { useArtists, useCreateBooking } from "@/hooks/use-tattoo";
import { insertBookingSchema } from "@shared/schema";
import { cn } from "@/lib/utils";
import { z } from "zod";

// Frontend validation schema
const formSchema = insertBookingSchema.extend({
  bookingDate: z.date({
    required_error: "A date is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookSession() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const preSelectedArtist = searchParams.get("artist");

  const { data: artists, isLoading: artistsLoading } = useArtists();
  const { mutate: createBooking, isPending, isSuccess } = useCreateBooking();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistId: preSelectedArtist ? parseInt(preSelectedArtist) : undefined,
      clientName: "",
      clientEmail: "",
      concept: "",
      placement: "",
      sizeEstimate: "",
    },
  });

  function onSubmit(data: FormValues) {
    createBooking(data);
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center p-8 border border-primary bg-card max-w-lg mx-4">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-3xl font-display text-white mb-4">Request Received</h2>
          <p className="text-gray-400 mb-8">
            We have received your booking request. Our team will review your concept and get back to you within 48 hours to confirm details and collect a deposit.
          </p>
          <Button 
            className="bg-primary text-black font-bold uppercase tracking-widest rounded-none"
            onClick={() => window.location.href = "/"}
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeader 
          title="Ready?" 
          subtitle="Lock your slot. Pay your deposit. Show up." 
          center 
          className="mb-12"
        />

        <div className="bg-card border border-zinc-900 p-6 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Artist Selection */}
                <FormField
                  control={form.control}
                  name="artistId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Select Artist</FormLabel>
                      <Select 
                        onValueChange={(val) => field.onChange(parseInt(val))} 
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black border-zinc-800 text-white rounded-none h-12">
                            <SelectValue placeholder={artistsLoading ? "Loading..." : "Choose an artist"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-zinc-800 text-white rounded-none">
                          {artists?.map((artist) => (
                            <SelectItem key={artist.id} value={artist.id.toString()}>
                              {artist.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Selection */}
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-12 w-full pl-3 text-left font-normal bg-black border-zinc-800 text-white rounded-none hover:bg-zinc-900 hover:text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-primary text-white" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="bg-card text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="bg-black border-zinc-800 rounded-none h-12 text-white placeholder:text-zinc-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} className="bg-black border-zinc-800 rounded-none h-12 text-white placeholder:text-zinc-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tattoo Details */}
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Concept Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your idea in detail..." 
                        className="bg-black border-zinc-800 rounded-none min-h-[120px] text-white placeholder:text-zinc-600 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="placement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Placement</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Inner Forearm, Upper Back" {...field} className="bg-black border-zinc-800 rounded-none h-12 text-white placeholder:text-zinc-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sizeEstimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold uppercase tracking-wider text-xs">Size Estimate (Inches)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5x5 inches" {...field} className="bg-black border-zinc-800 rounded-none h-12 text-white placeholder:text-zinc-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-16 bg-primary text-black font-bold text-xl uppercase tracking-widest rounded-none hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(201,162,39,0.3)]"
                >
                  {isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                  ) : (
                    "Confirm & Pay Deposit"
                  )}
                </Button>
                <p className="text-center text-zinc-500 text-sm mt-4">
                  A deposit of $100 is required to secure your booking. This amount will be deducted from the final cost.
                </p>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
