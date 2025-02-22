import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";

const InputForm = ({ policies, selectedPolicy, onSelectPolicy, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  // Watch form values
  const income = watch("income", 0);
  const payableAmount = watch("payableAmount", 0);
  const coverage = watch("coverage", 1);
  const duration = watch("duration", 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Policy Selection Dropdown */}
      <div>
        <label className="block text-sm font-medium">Select Policy</label>
        <select
          onChange={(e) => {
            const selected = policies.find((policy) => policy.policyName === e.target.value);
            onSelectPolicy(selected);
          }}
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="">Select a policy</option>
          {policies.map((policy) => (
            <option key={policy.policyName} value={policy.policyName}>
              {policy.policyName}
            </option>
          ))}
        </select>
        {!selectedPolicy && (
          <p className="text-red-500 text-sm">Please select a policy.</p>
        )}
      </div>

      {/* Income Slider */}
      <div>
        <label className="block text-sm font-medium">
          Annual Income: ${income}
        </label>
        <Slider
          value={income}
          onChange={(e, value) => setValue("income", value)}
          min={0}
          max={200000}
          step={1000}
          valueLabelDisplay="auto"
          className="mt-2"
        />
        <input
          type="hidden"
          {...register("income", { required: true })}
        />
        {errors.income && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>

      {/* Payable Insurance Amount Slider */}
      <div>
        <label className="block text-sm font-medium">
          Payable Insurance Amount (Annual): ${payableAmount}
        </label>
        <Slider
          value={payableAmount}
          onChange={(e, value) => setValue("payableAmount", value)}
          min={0}
          max={10000}
          step={100}
          valueLabelDisplay="auto"
          className="mt-2"
        />
        <input
          type="hidden"
          {...register("payableAmount", { required: true })}
        />
        {errors.payableAmount && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>

      {/* Coverage Slider */}
      <div>
        <label className="block text-sm font-medium">
          Coverage Amount: ${coverage}
        </label>
        <Slider
          value={coverage}
          onChange={(e, value) => setValue("coverage", value)}
          min={1000}
          max={100000}
          step={1000}
          valueLabelDisplay="auto"
          className="mt-2"
        />
        <input
          type="hidden"
          {...register("coverage", { required: true })}
        />
        {errors.coverage && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>

      {/* Duration Slider */}
      <div>
        <label className="block text-sm font-medium">
          Duration (Years): {duration}
        </label>
        <Slider
          value={duration}
          onChange={(e, value) => setValue("duration", value)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          className="mt-2"
        />
        <input
          type="hidden"
          {...register("duration", { required: true })}
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
        Calculate
      </button>
    </form>
  );
};

export default InputForm;